export class Assert {
  static ok(value: unknown, message: string): asserts value {
    if (!value) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  static unreachable(message = "Reached unreachable code") {
    throw new Error(message);
  }
}
