import type { Input, System, World } from "@starforge/engine";
import { createProjectile } from "../entities/Projectile";
import { BodyRef, PlayerTag, Position, Velocity } from "../GameComponents";

export class PlayerControlSystem implements System {
  private fireCooldown = 0;

  update(world: World, dt: number) {
    const input = world.resources.get<Input>("input");
    const speed = 240;
    this.fireCooldown = Math.max(0, this.fireCooldown - dt);

    for (const entity of world.query(PlayerTag, Velocity, Position, BodyRef).entities(world)) {
      const velocity = world.get(entity, Velocity);
      const body = world.get(entity, BodyRef).body;
      velocity.x = 0;
      velocity.y = 0;

      if (input.actionDown("left")) velocity.x = -speed;
      if (input.actionDown("right")) velocity.x = speed;
      if (input.actionDown("up")) velocity.y = -speed;
      if (input.actionDown("down")) velocity.y = speed;

      if (input.actionPressed("shoot") && this.fireCooldown === 0) {
        const pos = world.get(entity, Position);
        createProjectile(world, pos.x + 8, pos.y + 8, 400, 0);
        body.velocity.x += 40;
        this.fireCooldown = 0.2;
      }
    }
  }
}
