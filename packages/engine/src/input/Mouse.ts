import { Vec2 } from "../math/Vec2";

export class Mouse {
  position = new Vec2();
  private buttons = new Set<number>();
  private pressed = new Set<number>();
  private released = new Set<number>();

  constructor(target: Window | HTMLElement = window) {
    target.addEventListener("mousemove", (event) => {
      this.position.set(event.clientX, event.clientY);
    });
    target.addEventListener("mousedown", (event) => {
      if (!this.buttons.has(event.button)) {
        this.pressed.add(event.button);
      }
      this.buttons.add(event.button);
    });
    target.addEventListener("mouseup", (event) => {
      this.buttons.delete(event.button);
      this.released.add(event.button);
    });
  }

  update() {
    this.pressed.clear();
    this.released.clear();
  }

  isDown(button: number) {
    return this.buttons.has(button);
  }

  wasPressed(button: number) {
    return this.pressed.has(button);
  }

  wasReleased(button: number) {
    return this.released.has(button);
  }
}
