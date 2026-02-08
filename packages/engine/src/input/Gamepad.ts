export class GamepadInput {
  private index = 0;
  private prevButtons: boolean[] = [];
  private pressed = new Set<number>();
  private released = new Set<number>();

  update() {
    const gamepad = navigator.getGamepads()[this.index];
    this.pressed.clear();
    this.released.clear();
    if (!gamepad) return;
    gamepad.buttons.forEach((button, idx) => {
      const wasDown = this.prevButtons[idx] ?? false;
      if (button.pressed && !wasDown) {
        this.pressed.add(idx);
      }
      if (!button.pressed && wasDown) {
        this.released.add(idx);
      }
      this.prevButtons[idx] = button.pressed;
    });
  }

  isDown(button: number) {
    const gamepad = navigator.getGamepads()[this.index];
    return gamepad?.buttons[button]?.pressed ?? false;
  }

  wasPressed(button: number) {
    return this.pressed.has(button);
  }

  wasReleased(button: number) {
    return this.released.has(button);
  }

  axis(axis: number) {
    const gamepad = navigator.getGamepads()[this.index];
    return gamepad?.axes[axis] ?? 0;
  }
}
