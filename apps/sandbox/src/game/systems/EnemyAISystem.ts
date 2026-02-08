import type { System, World } from "@starforge/engine";
import { AStar, type Tilemap } from "@starforge/engine";
import { AIPath, EnemyTag, Position, Velocity } from "../GameComponents";

export class EnemyAISystem implements System {
  private timer = 0;

  update(world: World, dt: number) {
    const tilemap = world.resources.get<Tilemap>("tilemap");
    this.timer += dt;
    const playerEntity = [...world.query(Position).entities(world)][0];
    if (!playerEntity) return;
    const playerPos = world.get(playerEntity, Position);

    for (const entity of world.query(EnemyTag, Position, Velocity, AIPath).entities(world)) {
      const position = world.get(entity, Position);
      const velocity = world.get(entity, Velocity);
      const path = world.get(entity, AIPath);

      if (this.timer >= 0.5) {
        const start = { x: Math.floor(position.x / tilemap.data.tileSize), y: Math.floor(position.y / tilemap.data.tileSize) };
        const goal = { x: Math.floor(playerPos.x / tilemap.data.tileSize), y: Math.floor(playerPos.y / tilemap.data.tileSize) };
        path.path = AStar.findPath(tilemap, start, goal, false);
        path.index = 0;
      }

      const next = path.path[path.index + 1];
      if (next) {
        const targetX = next.x * tilemap.data.tileSize + tilemap.data.tileSize / 2;
        const targetY = next.y * tilemap.data.tileSize + tilemap.data.tileSize / 2;
        const dx = targetX - position.x;
        const dy = targetY - position.y;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = 140;
        velocity.x = (dx / dist) * speed;
        velocity.y = (dy / dist) * speed;
        if (dist < 6) {
          path.index += 1;
        }
      } else {
        velocity.x = 0;
        velocity.y = 0;
      }
    }

    if (this.timer >= 0.5) {
      this.timer = 0;
    }
  }
}
