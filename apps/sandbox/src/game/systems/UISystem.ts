import type { Input, Renderer } from "@starforge/engine";
import type { UIElement } from "@starforge/engine";

export class UISystem {
  constructor(private root: UIElement) {}

  update(input: Input) {
    this.root.update(input.mouse.position, input.mouse.wasPressed(0));
  }

  render(renderer: Renderer) {
    this.root.render(renderer);
  }
}
