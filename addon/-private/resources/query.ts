import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

type QueryParams = Parameters<Store['query']>;
export type QueryQuery = QueryParams[1];
export type QueryOptions = QueryParams[2];

interface NamedArgs {
  modelName: string;
  query: QueryQuery;
  options: QueryOptions;
}

export class Query<Args extends Named<NamedArgs>> extends Request<Args> {
  @tracked _records: unknown;

  @action
  async __WRAPPED_FUNCTION__() {
    let { modelName, query, options } = this.args.named;

    let records = await this.store.query(modelName as never, query, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._records = records;
  }

  get records() {
    return this._records;
  }
}
