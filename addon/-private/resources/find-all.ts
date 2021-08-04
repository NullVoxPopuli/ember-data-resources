import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type ArrayProxy from '@ember/array/proxy';
import type Store from '@ember-data/store';

export type FindAllOptions = Parameters<Store['findAll']>[1];

type PositionalArgs = [string];
export interface NamedArgs {
  options: FindAllOptions;
}

interface Args {
  named: NamedArgs;
  positional: PositionalArgs;
}

export class FindAll<Model, LocalArgs extends Args = Args> extends Request<LocalArgs> {
  @tracked private _records: ArrayProxy<Model> | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let [modelName] = this.args.positional;
    let { options } = this.args.named;

    let records = await this.store.findAll(modelName as never, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._records = records;
  }

  get records(): ArrayProxy<Model> | undefined {
    return this._records;
  }
}
