import { Rect } from "../math/Rect";
import { Vec2 } from "../math/Vec2";
import type { Renderer } from "../render/Renderer";

export class UIElement {
  bounds: Rect;
  children: UIElement[] = [];
  visible = true;

  constructor(x = 0, y = 0, width = 100, height = 40) {
    this.bounds = new Rect(x, y, width, height);
  }

  add(child: UIElement) {
    this.children.push(child);
  }

  update(_mouse: Vec2, _clicked: boolean) {
    for (const child of this.children) {
      child.update(_mouse, _clicked);
    }
  }

  render(renderer: Renderer) {
    if (!this.visible) return;
    for (const child of this.children) {
      child.render(renderer);
    }
  }
}
