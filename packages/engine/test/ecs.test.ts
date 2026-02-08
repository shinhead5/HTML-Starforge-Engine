import { describe, expect, it } from "vitest";
import { createComponent } from "../src/ecs/Component";
import { World } from "../src/ecs/World";

const Position = createComponent<{ x: number; y: number }>("Position");
const Velocity = createComponent<{ x: number; y: number }>("Velocity");

describe("ecs", () => {
  it("queries entities with components", () => {
    const world = new World();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    world.add(e1, Position, { x: 0, y: 0 });
    world.add(e1, Velocity, { x: 1, y: 1 });
    world.add(e2, Position, { x: 2, y: 2 });

    const query = world.query(Position, Velocity);
    const results = [...query.entities(world)];
    expect(results).toEqual([e1]);
  });
});
