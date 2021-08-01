import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request } from './request';

import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

export type FindRecordOptions = Parameters<Store['findRecord']>[2];

interface NamedArgs {
  id: string | number;
  modelName: string;
  options: FindRecordOptions;
}

export class FindRecord<Args extends Named<NamedArgs>> extends Request<Args> {
  @tracked _record: unknown;

  @action
  async __WRAPPED_FUNCTION__() {
    let { id, modelName, options } = this.args.named;

    let record = await this.store.findRecord(modelName as never, id, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record() {
    return this._record;
  }
}
