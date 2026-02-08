export class Resources {
  private values = new Map<string, unknown>();

  set<T>(key: string, value: T) {
    this.values.set(key, value);
  }

  get<T>(key: string): T {
    if (!this.values.has(key)) {
      throw new Error(`Resource not found: ${key}`);
    }
    return this.values.get(key) as T;
  }

  has(key: string) {
    return this.values.has(key);
  }
}
