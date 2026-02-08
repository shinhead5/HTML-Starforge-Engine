import type { AssetManager, Renderer, World } from "@starforge/engine";
import { Color, Rect, Vec2 } from "@starforge/engine";
import { BodyRef, EnemyTag, PlayerTag, Position, Renderable } from "../GameComponents";

export class RenderSystem {
  render(renderer: Renderer, assets: AssetManager, world: World) {
    renderer.clear(new Color(12, 14, 24, 1));

    for (const entity of world.query(Renderable, Position).entities(world)) {
      const renderable = world.get(entity, Renderable);
      const position = world.get(entity, Position);
      const image = assets.getImage(renderable.sprite);
      renderer.drawSprite(
        { image, source: new Rect(0, 0, 1, 1) },
        {
          position: new Vec2(position.x, position.y),
          size: renderable.size
        }
      );
    }

    for (const entity of world.query(PlayerTag, BodyRef).entities(world)) {
      const body = world.get(entity, BodyRef).body;
      renderer.drawRect(new Rect(body.position.x, body.position.y - 8, 28, 4), new Color(40, 200, 40, 1), true);
    }

    for (const entity of world.query(EnemyTag, BodyRef).entities(world)) {
      const body = world.get(entity, BodyRef).body;
      renderer.drawRect(new Rect(body.position.x, body.position.y - 6, 22, 3), new Color(200, 60, 60, 1), true);
    }
  }
}
