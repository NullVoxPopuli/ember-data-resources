import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type { Id } from './types';
import type Store from '@ember-data/store';

export type FindRecordOptions = Parameters<Store['findRecord']>[2];

type PositionalArgs = [string, Id];
export interface NamedArgs {
  options: FindRecordOptions;
}

export interface Args {
  named: NamedArgs;
  positional: PositionalArgs;
}

export class FindRecord<Model, LocalArgs extends Args = Args> extends Request<LocalArgs> {
  @tracked private _record: Model | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let [modelName, id] = this.args.positional;
    let { options } = this.args.named;

    let record = await this.store.findRecord(modelName as never, id, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record(): Model | undefined {
    return this._record;
  }
}
