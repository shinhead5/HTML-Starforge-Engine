import { Body, Vec2 } from "@starforge/engine";
import type { World } from "@starforge/engine";
import { BodyRef, Position, ProjectileTag, Renderable, Velocity } from "../GameComponents";

export const createProjectile = (world: World, x: number, y: number, vx: number, vy: number) => {
  const entity = world.createEntity();
  world.add(entity, Position, { x, y });
  world.add(entity, Velocity, { x: vx, y: vy });
  world.add(entity, Renderable, { sprite: "projectile", size: new Vec2(10, 10) });
  world.add(entity, ProjectileTag, { damage: 10 });
  world.add(entity, BodyRef, {
    body: new Body({
      position: new Vec2(x, y),
      size: new Vec2(10, 10),
      type: "dynamic",
      gravity: new Vec2(0, 0)
    })
  });
  return entity;
};
