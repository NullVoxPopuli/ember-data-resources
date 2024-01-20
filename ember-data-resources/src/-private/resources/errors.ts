export class IdRequiredError extends TypeError {
  constructor(modelName: string) {
    super(
      `While trying to request a resource from ${modelName}, the ID was either null or undefined, and the ID is required for fetching resources`,
    );
  }
}

export class IdTypeError extends TypeError {
  constructor(modelName: string, id: unknown) {
    super(
      `While trying to request a resource from ${modelName}, the ID was of invalid type ${typeof id}: only string and number are supported`,
    );
  }
}
