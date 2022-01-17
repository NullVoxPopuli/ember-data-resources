export class IdRequiredError extends Error {
  constructor(modelName: string) {
    super(
      `While trying to request a resource from ${modelName}, the ID was either null or undefined, and the ID is required for fetching resources`
    );
  }
}

export class IdTypeError extends TypeError {
  constructor(modelName: string) {
    super(
      `While trying to request a resource from ${modelName}, the ID was of invalid type: only string and number are supported`
    );
  }
}
