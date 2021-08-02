import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type ArrayProxy from '@ember/array/proxy';
import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

export type FindAllOptions = Parameters<Store['findAll']>[1];

export interface NamedArgs {
  modelName: string;
  options: FindAllOptions;
}

export class FindAll<
  Model,
  Args extends Named<NamedArgs> = Named<NamedArgs>
> extends Request<Args> {
  @tracked private _records: ArrayProxy<Model> | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let { modelName, options } = this.args.named;

    let records = await this.store.findAll(modelName as never, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._records = records;
  }

  get records(): ArrayProxy<Model> | undefined {
    return this._records;
  }
}
