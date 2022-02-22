import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { waitFor, waitForPromise } from '@ember/test-waiters';

import { Resource } from 'ember-resources';

import type Store from '@ember-data/store';
import type { ArgsWrapper } from 'ember-resources';

export type FindRecordOptions = Parameters<Store['findRecord']>[2];

export class Request<Args> extends Resource<Args> {
  declare args: Args;

  @service declare store: Store;

  @tracked error: Error | undefined;
  @tracked isLoading = false;
  @tracked hasRan = false;

  constructor(owner: unknown, args: Args, previous?: Request<Args>) {
    super(owner, args, previous);

    this.__REQUEST_FUNCTION__();
  }

  async __WRAPPED_FUNCTION__() {
    throw new Error('Not Implemented');
  }

  get isSuccess() {
    return !this.error;
  }

  get isError() {
    return Boolean(this.error);
  }

  get records(): unknown | undefined {
    return assert(
      `The resource for ${this.constructor.name} does not have a records property. ` +
        `You might be looking for .record instead.`
    );
  }

  get record(): unknown | undefined {
    return assert(
      `The resource for ${this.constructor.name} does not have a record property. ` +
        `You might be looking for .records instead.`
    );
  }

  @action async retry() {
    return waitForPromise(this.__WRAPPED_FUNCTION__());
  }

  @action
  @waitFor
  async __REQUEST_FUNCTION__() {
    consumeEverything(this.args);

    await Promise.resolve();

    if (isDestroyed(this) || isDestroying(this)) return;

    this.error = undefined;
    this.isLoading = true;

    try {
      await this.retry();
    } catch (e) {
      if (isDestroyed(this) || isDestroying(this)) return;

      this.error = e;
    }

    if (isDestroyed(this) || isDestroying(this)) {
      return;
    }

    this.isLoading = false;
    this.hasRan = true;
  }
}

/**
 * Helper function to bind all arguments to the lifecycle of the resource
 */
function consumeEverything(args: ArgsWrapper) {
  for (let i = 0; i < (args.positional?.length || 0); i++) {
    args.positional?.[i];
  }

  for (let key in args.named || {}) {
    args.named?.[key];
  }
}
