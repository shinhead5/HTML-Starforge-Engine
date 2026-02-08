import { Color } from "../math/Color";
import { Vec2 } from "../math/Vec2";
import type { Renderer } from "../render/Renderer";
import { UIElement } from "./UIElement";

export class TextLabel extends UIElement {
  text = "";
  color = new Color(255, 255, 255, 1);
  font = "16px sans-serif";

  render(renderer: Renderer) {
    renderer.drawText(this.text, new Vec2(this.bounds.x, this.bounds.y + this.bounds.height), this.color, this.font);
  }
}
