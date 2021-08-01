import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request, WrappedFun } from './request';

import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

type QueryParams = Parameters<Store['queryRecord']>;
export type QueryRecordQuery = QueryParams[1];
export type QueryRecordOptions = QueryParams[2];

interface NamedArgs {
  modelName: string;
  query: QueryRecordQuery;
  options: QueryRecordOptions;
}

export class QueryRecord<Args extends Named<NamedArgs>> extends Request<Args> {
  @tracked _record: unknown;

  @action
  async [WrappedFun]() {
    let { modelName, query, options } = this.args.named;

    let record = await this.store.queryRecord(modelName as never, query, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record() {
    return this._record;
  }
}
