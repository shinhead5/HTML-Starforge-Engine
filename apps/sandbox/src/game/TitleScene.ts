import { Button, Color, Scene, TweenManager, Vec2 } from "@starforge/engine";
import type { Engine, Renderer } from "@starforge/engine";

export class TitleScene extends Scene {
  private tween = new TweenManager();
  private alpha = { value: 0 };
  private startButton = new Button(540, 360, 200, 48);

  init(engine: Engine) {
    this.startButton.text = "Start Mission";
    this.startButton.onClick = () => engine.scenes.start("play", engine);
    this.tween.tween(this.alpha, { value: 1 }, 1);
  }

  update(engine: Engine, dt: number) {
    this.tween.update(dt);
    this.startButton.update(engine.input.mouse.position, engine.input.mouse.wasPressed(0));
    if (engine.input.keyboard.wasPressed("Enter")) {
      engine.scenes.start("play", engine);
    }
  }

  render(_engine: Engine, renderer: Renderer) {
    renderer.clear(new Color(12, 14, 24, 1));
    renderer.drawText("STARFORGE ENGINE", new Vec2(420, 240), new Color(230, 230, 255, this.alpha.value), "32px sans-serif");
    renderer.drawText("Press Enter or click Start", new Vec2(450, 300), new Color(180, 180, 220, 1));
    this.startButton.render(renderer);
  }
}
