import { UIElement } from "./UIElement";

export class UILayout extends UIElement {
  gap = 8;

  layoutVertical() {
    let y = this.bounds.y;
    for (const child of this.children) {
      child.bounds.y = y;
      child.bounds.x = this.bounds.x;
      y += child.bounds.height + this.gap;
    }
  }
}
