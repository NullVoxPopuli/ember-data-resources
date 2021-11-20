export class IdRequiredError extends Error {
  constructor(modelName: string) {
    super(
      `While trying to request a resource from ${modelName}, the ID was either null or undefined, and the ID is required for fetching resources`
    );
  }
}
