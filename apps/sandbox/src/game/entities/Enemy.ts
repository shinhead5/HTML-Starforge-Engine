import { Body, Vec2 } from "@starforge/engine";
import type { World } from "@starforge/engine";
import { AIPath, BodyRef, EnemyTag, Health, Position, Renderable, Velocity } from "../GameComponents";

export const createEnemy = (world: World, x: number, y: number) => {
  const entity = world.createEntity();
  world.add(entity, Position, { x, y });
  world.add(entity, Velocity, { x: 0, y: 0 });
  world.add(entity, Renderable, { sprite: "enemy", size: new Vec2(26, 26) });
  world.add(entity, Health, { current: 40, max: 40 });
  world.add(entity, EnemyTag, {});
  world.add(entity, AIPath, { path: [], index: 0 });
  world.add(entity, BodyRef, { body: new Body({ position: new Vec2(x, y), size: new Vec2(26, 26), type: "dynamic" }) });
  return entity;
};
