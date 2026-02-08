import { Rect } from "../../math/Rect";
import { Vec2 } from "../../math/Vec2";

export class Camera2D {
  position = new Vec2();
  zoom = 1;
  rotation = 0;
  bounds: Rect | null = null;

  worldToScreen(point: Vec2, viewport: Vec2) {
    const x = (point.x - this.position.x) * this.zoom + viewport.x / 2;
    const y = (point.y - this.position.y) * this.zoom + viewport.y / 2;
    return new Vec2(x, y);
  }

  screenToWorld(point: Vec2, viewport: Vec2) {
    const x = (point.x - viewport.x / 2) / this.zoom + this.position.x;
    const y = (point.y - viewport.y / 2) / this.zoom + this.position.y;
    return new Vec2(x, y);
  }

  clampToBounds(viewport: Vec2) {
    if (!this.bounds) return;
    const halfW = viewport.x / (2 * this.zoom);
    const halfH = viewport.y / (2 * this.zoom);
    this.position.x = Math.min(Math.max(this.position.x, this.bounds.x + halfW), this.bounds.x + this.bounds.width - halfW);
    this.position.y = Math.min(Math.max(this.position.y, this.bounds.y + halfH), this.bounds.y + this.bounds.height - halfH);
  }
}
