import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

export type FindRecordOptions = Parameters<Store['findRecord']>[2];

export interface NamedArgs {
  id: string | number;
  modelName: string;
  options: FindRecordOptions;
}

export class FindRecord<
  Model,
  Args extends Named<NamedArgs> = Named<NamedArgs>
> extends Request<Args> {
  @tracked private _record: Model | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let { id, modelName, options } = this.args.named;

    let record = await this.store.findRecord(modelName as never, id, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record(): Model | undefined {
    return this._record;
  }
}
