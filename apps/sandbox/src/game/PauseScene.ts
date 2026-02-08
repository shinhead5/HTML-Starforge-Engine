import { Button, Color, Scene, Vec2 } from "@starforge/engine";
import type { Engine, Renderer } from "@starforge/engine";

export class PauseScene extends Scene {
  private resumeButton = new Button(520, 320, 240, 48);

  init(engine: Engine) {
    this.resumeButton.text = "Resume";
    this.resumeButton.onClick = () => engine.scenes.popOverlay(engine);
  }

  update(engine: Engine, _dt: number) {
    this.resumeButton.update(engine.input.mouse.position, engine.input.mouse.wasPressed(0));
    if (engine.input.keyboard.wasPressed("Escape")) {
      engine.scenes.popOverlay(engine);
    }
  }

  render(_engine: Engine, renderer: Renderer) {
    renderer.drawRect({ x: 0, y: 0, width: 1280, height: 720 }, new Color(0, 0, 0, 0.6), true);
    renderer.drawText("Paused", new Vec2(580, 260), new Color(240, 240, 240, 1), "28px sans-serif");
    this.resumeButton.render(renderer);
  }
}
