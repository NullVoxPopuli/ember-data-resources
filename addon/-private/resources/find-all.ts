import { tracked } from '@glimmer/tracking';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';

import { Request, WrappedFun } from './request';

import type Store from '@ember-data/store';
import type { Named } from 'ember-resources';

export type FindAllOptions = Parameters<Store['findAll']>[1];

interface NamedArgs {
  modelName: string;
  options: FindAllOptions;
}

export class FindAll<Args extends Named<NamedArgs>> extends Request<Args> {
  @tracked _records: unknown;

  @action
  async [WrappedFun]() {
    let { modelName, options } = this.args.named;

    let records = await this.store.findAll(modelName as never, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._records = records;
  }

  get records() {
    return this._records;
  }
}
