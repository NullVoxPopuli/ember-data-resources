import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { action } from '@ember/object';
import * as emberService from '@ember/service';

const service = emberService.service ?? emberService.inject;

import { waitFor, waitForPromise } from '@ember/test-waiters';

import { Resource } from 'ember-modify-based-class-resource';

import type Store from '@ember-data/store';

export type FindRecordOptions = Parameters<Store['findRecord']>[2];

export class Request<Args> extends Resource<Args> {
  @service declare store: Store;

  @tracked error: Error | undefined;
  @tracked isLoading = false;
  @tracked hasRan = false;

  /**
   * Args saved, untracked, for retrying
   */
  declare positional: unknown[];
  declare named: object;

  modify(positional?: unknown[], named?: object) {
    this.positional = positional || [];
    this.named = named || {};

    /**
     * We need to consume all arguments here so that we correctly respond to updates to
     * dirtied source data.
     *
     * e.g.: when an id changes that is passed to findRecord, we re-fetch.
     */
    this.__REQUEST_FUNCTION__([...(positional as unknown[])], {
      ...named,
    });
  }

  async __WRAPPED_FUNCTION__(_positional: unknown[], _named: object) {
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
        `You might be looking for .record instead.`,
    );
  }

  get record(): unknown | undefined {
    return assert(
      `The resource for ${this.constructor.name} does not have a record property. ` +
        `You might be looking for .records instead.`,
    );
  }

  @action
  async retry() {
    return waitForPromise(this.__WRAPPED_FUNCTION__(this.positional, this.named));
  }

  @action
  @waitFor
  async __REQUEST_FUNCTION__(_positional: unknown[], _named: object) {
    /**
     * Args are already consumed, but let's delay doing anything
     * until we can get out of a tracking frame.
     */
    await Promise.resolve();

    if (isDestroyed(this) || isDestroying(this)) return;

    this.error = undefined;
    this.isLoading = true;

    try {
      await this.retry();
    } catch (e) {
      if (isDestroyed(this) || isDestroying(this)) return;

      if (e instanceof Error) {
        this.error = e;
      } else {
        // How likely is this to happen?
        throw e;
      }
    }

    if (isDestroyed(this) || isDestroying(this)) {
      return;
    }

    this.isLoading = false;
    this.hasRan = true;
  }
}
