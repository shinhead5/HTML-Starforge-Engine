import { Color } from "../math/Color";
import type { Renderer } from "../render/Renderer";
import type { Body } from "../physics/Body";
import { Rect } from "../math/Rect";

export class Gizmos {
  static drawCollider(renderer: Renderer, body: Body, color = new Color(0, 255, 0, 0.7)) {
    renderer.drawRect(new Rect(body.position.x, body.position.y, body.size.x, body.size.y), color, false);
  }

  static drawGrid(renderer: Renderer, width: number, height: number, cell: number) {
    const color = new Color(60, 60, 80, 0.4);
    for (let x = 0; x < width; x += cell) {
      renderer.drawRect(new Rect(x, 0, 1, height), color, true);
    }
    for (let y = 0; y < height; y += cell) {
      renderer.drawRect(new Rect(0, y, width, 1), color, true);
    }
  }
}
