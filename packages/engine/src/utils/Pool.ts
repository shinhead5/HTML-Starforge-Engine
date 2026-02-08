export type PoolFactory<T> = () => T;

export class Pool<T> {
  private readonly factory: PoolFactory<T>;
  private readonly items: T[] = [];

  constructor(factory: PoolFactory<T>, prewarm = 0) {
    this.factory = factory;
    for (let i = 0; i < prewarm; i += 1) {
      this.items.push(factory());
    }
  }

  acquire(): T {
    return this.items.pop() ?? this.factory();
  }

  release(item: T) {
    this.items.push(item);
  }

  get size() {
    return this.items.length;
  }
}
