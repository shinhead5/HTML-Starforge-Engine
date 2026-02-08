import { Color } from "../math/Color";
import { Vec2 } from "../math/Vec2";
import type { Renderer } from "../render/Renderer";
import { UIElement } from "./UIElement";

export class Button extends UIElement {
  text = "Button";
  onClick: (() => void) | null = null;
  private hovered = false;

  update(mouse: Vec2, clicked: boolean) {
    this.hovered = this.bounds.contains(mouse.x, mouse.y);
    if (this.hovered && clicked) {
      this.onClick?.();
    }
  }

  render(renderer: Renderer) {
    const base = this.hovered ? new Color(80, 120, 180, 1) : new Color(50, 80, 140, 1);
    renderer.drawRect(this.bounds, base, true);
    renderer.drawText(this.text, new Vec2(this.bounds.x + 12, this.bounds.y + this.bounds.height / 2 + 6), new Color(240, 240, 240, 1));
  }
}
