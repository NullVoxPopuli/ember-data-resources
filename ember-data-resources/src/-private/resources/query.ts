import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type ArrayProxy from '@ember/array/proxy';
import type Store from '@ember-data/store';

type QueryParams = Parameters<Store['query']>;
export type QueryQuery = QueryParams[1];
export type QueryOptions = QueryParams[2];

type PositionalArgs = [string, QueryQuery];
export interface NamedArgs {
  options: QueryOptions;
}

export interface Args {
  named: NamedArgs;
  positional: PositionalArgs;
}

export class Query<Model, LocalArgs extends Args = Args> extends Request<LocalArgs> {
  @tracked private _records: ArrayProxy<Model> | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let [modelName, query] = this.args.positional;
    let { options } = this.args.named;

    let records = await this.store.query(modelName as never, query, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._records = records;
  }

  get records(): ArrayProxy<Model> | undefined {
    return this._records;
  }
}
