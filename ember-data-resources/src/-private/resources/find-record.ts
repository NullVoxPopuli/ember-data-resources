import { tracked } from "@glimmer/tracking";
import { isDestroyed, isDestroying } from "@ember/destroyable";
import { action } from "@ember/object";
import { waitFor } from "@ember/test-waiters";

import { IdRequiredError, IdTypeError } from "./errors";
import { Request } from "./request";

import type { Id } from "./types";
import type Store from "@ember-data/store";

export type FindRecordOptions = Parameters<Store["findRecord"]>[2];

type PositionalArgs = [string, Id];
export interface NamedArgs {
  options: FindRecordOptions;
}

export interface Args {
  named: NamedArgs;
  positional: PositionalArgs;
}

export class FindRecord<
  Model,
  LocalArgs extends Args = Args
> extends Request<LocalArgs> {
  @tracked private _record: Model | undefined;

  @action
  @waitFor
  async __WRAPPED_FUNCTION__(
    [modelName, id]: PositionalArgs,
    { options }: NamedArgs
  ) {
    /**
     * ember-data forbids usage of invalid arguments
     * in JS, this is typically fine as we can also try-catch, but
     * since this *might* be used in a template as well as JS, we need to instead
     * throw our own error that gives a bit more context to the user so
     * they can pass in the correct arguments
     */
    if (id === null || id === undefined) {
      throw new IdRequiredError(modelName);
    } else if (typeof id !== "string" && typeof id !== "number") {
      throw new IdTypeError(modelName, id);
    }

    const record = await this.store.findRecord(modelName as never, id, options);

    if (isDestroyed(this) || isDestroying(this)) return;

    this._record = record;
  }

  get record(): Model | undefined {
    return this._record;
  }
}
