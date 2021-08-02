import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

type QueryParams = Parameters<Store['queryRecord']>;
export type QueryRecordQuery = QueryParams[1];
export type QueryRecordOptions = QueryParams[2];

export interface NamedArgs {
  modelName: string;
  query: QueryRecordQuery;
  options: QueryRecordOptions;
}

export class QueryRecord<
  Model,
  Args extends Named<NamedArgs> = Named<NamedArgs>
> extends Request<Args> {
  @tracked private _record: Model | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let { modelName, query, options } = this.args.named;

    let record = await this.store.queryRecord(modelName as never, query, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record(): Model | undefined {
    return this._record;
  }
}
