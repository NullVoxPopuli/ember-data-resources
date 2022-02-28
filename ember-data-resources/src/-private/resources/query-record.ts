import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type Store from '@ember-data/store';

type QueryParams = Parameters<Store['queryRecord']>;
export type QueryRecordQuery = QueryParams[1];
export type QueryRecordOptions = QueryParams[2];

type PositionalArgs = [string, QueryRecordQuery];
export interface NamedArgs {
  options: QueryRecordOptions;
}

export interface Args {
  named: NamedArgs;
  positional: PositionalArgs;
}

export class QueryRecord<Model, LocalArgs extends Args = Args> extends Request<LocalArgs> {
  @tracked private _record: Model | undefined;

  @action
  async __WRAPPED_FUNCTION__() {
    let [modelName, query] = this.args.positional;
    let { options } = this.args.named;

    let record = await this.store.queryRecord(modelName as never, query, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record(): Model | undefined {
    return this._record;
  }
}
