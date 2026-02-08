import { EventBus } from "../core/EventBus";
import type { ComponentStore, ComponentType } from "./Component";
import type { System } from "./System";
import { Query } from "./Query";
import { Resources } from "./Resources";

export type WorldEvents = {
  entityCreated: number;
  entityRemoved: number;
};

export class World {
  private nextEntity = 1;
  private stores = new Map<string, ComponentStore<unknown>>();
  private systems: System[] = [];

  readonly resources = new Resources();
  readonly events = new EventBus<WorldEvents>();

  register<T>(type: ComponentType<T>) {
    if (!this.stores.has(type.name)) {
      this.stores.set(type.name, new Map());
    }
  }

  createEntity(): number {
    const id = this.nextEntity++;
    this.events.emit("entityCreated", id);
    return id;
  }

  removeEntity(entity: number) {
    for (const store of this.stores.values()) {
      store.delete(entity);
    }
    this.events.emit("entityRemoved", entity);
  }

  store<T>(type: ComponentType<T>): ComponentStore<T> | undefined {
    return this.stores.get(type.name) as ComponentStore<T> | undefined;
  }

  add<T>(entity: number, type: ComponentType<T>, component: T) {
    this.register(type);
    this.store(type)?.set(entity, component);
  }

  remove<T>(entity: number, type: ComponentType<T>) {
    this.store(type)?.delete(entity);
  }

  get<T>(entity: number, type: ComponentType<T>): T {
    const component = this.store(type)?.get(entity);
    if (!component) {
      throw new Error(`Component ${type.name} missing on entity ${entity}`);
    }
    return component;
  }

  has<T>(entity: number, type: ComponentType<T>): boolean {
    return this.store(type)?.has(entity) ?? false;
  }

  query(...types: ComponentType<unknown>[]) {
    return new Query(types);
  }

  addSystem(system: System) {
    this.systems.push(system);
  }

  update(dt: number) {
    for (const system of this.systems) {
      system.update(this, dt);
    }
  }
}
