import { describe, expect, it } from "vitest";
import { Body } from "../src/physics/Body";
import { PhysicsWorld } from "../src/physics/PhysicsWorld";

const createBody = (x: number, y: number, type: "static" | "dynamic") => {
  return new Body({ position: { x, y }, size: { x: 10, y: 10 }, type });
};

describe("physics", () => {
  it("resolves collisions against static bodies", () => {
    const world = new PhysicsWorld();
    const floor = createBody(0, 20, "static");
    const player = createBody(0, 0, "dynamic");
    world.add(floor);
    world.add(player);

    world.step(0.016);
    expect(player.position.y).toBeLessThan(20);
  });
});
