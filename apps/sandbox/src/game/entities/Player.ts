import { Body, Vec2 } from "@starforge/engine";
import type { World } from "@starforge/engine";
import { BodyRef, Health, PlayerTag, Position, Renderable, Velocity } from "../GameComponents";

export const createPlayer = (world: World, x: number, y: number) => {
  const entity = world.createEntity();
  world.add(entity, Position, { x, y });
  world.add(entity, Velocity, { x: 0, y: 0 });
  world.add(entity, Renderable, { sprite: "player", size: new Vec2(28, 28) });
  world.add(entity, Health, { current: 100, max: 100 });
  world.add(entity, PlayerTag, {});
  world.add(entity, BodyRef, { body: new Body({ position: new Vec2(x, y), size: new Vec2(28, 28), type: "dynamic" }) });
  return entity;
};
