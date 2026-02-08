import type { ComponentType } from "./Component";
import type { World } from "./World";

export class Query {
  constructor(private types: ComponentType<unknown>[]) {}

  *entities(world: World): Iterable<number> {
    if (this.types.length === 0) {
      return;
    }
    const stores = this.types.map((type) => world.store(type));
    const [first, ...rest] = stores;
    if (!first) return;
    for (const entity of first.keys()) {
      let ok = true;
      for (const store of rest) {
        if (!store?.has(entity)) {
          ok = false;
          break;
        }
      }
      if (ok) {
        yield entity;
      }
    }
  }
}
