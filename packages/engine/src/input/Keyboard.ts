export class Keyboard {
  private keys = new Set<string>();
  private pressed = new Set<string>();
  private released = new Set<string>();

  constructor() {
    window.addEventListener("keydown", (event) => {
      const key = event.code;
      if (!this.keys.has(key)) {
        this.pressed.add(key);
      }
      this.keys.add(key);
    });
    window.addEventListener("keyup", (event) => {
      const key = event.code;
      this.keys.delete(key);
      this.released.add(key);
    });
  }

  update() {
    this.pressed.clear();
    this.released.clear();
  }

  isDown(code: string) {
    return this.keys.has(code);
  }

  wasPressed(code: string) {
    return this.pressed.has(code);
  }

  wasReleased(code: string) {
    return this.released.has(code);
  }
}
