import type { Engine } from "../core/Engine";
import { Color } from "../math/Color";
import { Vec2 } from "../math/Vec2";
import type { Renderer } from "../render/Renderer";

export class DebugOverlay {
  visible = false;
  private fps = 0;
  private frameCount = 0;
  private elapsed = 0;

  constructor(private engine: Engine) {}

  update(dt: number) {
    this.elapsed += dt;
    this.frameCount += 1;
    if (this.elapsed >= 1) {
      this.fps = this.frameCount / this.elapsed;
      this.elapsed = 0;
      this.frameCount = 0;
    }
    if (this.engine.input.keyboard.wasPressed("F3")) {
      this.visible = !this.visible;
    }
  }

  render(renderer: Renderer) {
    this.update(this.engine.time.delta);
    if (!this.visible) return;
    const color = new Color(220, 220, 220, 1);
    renderer.drawRect({ x: 10, y: 10, width: 210, height: 80 }, new Color(0, 0, 0, 0.6), true);
    renderer.drawText(`FPS: ${this.fps.toFixed(0)}`, new Vec2(20, 35), color);
    renderer.drawText(`dt: ${(this.engine.time.delta * 1000).toFixed(2)}ms`, new Vec2(20, 55), color);
    renderer.drawText(`Draws: ${renderer.getDrawCalls()}`, new Vec2(20, 75), color);
  }
}
