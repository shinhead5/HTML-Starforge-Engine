import { Bindings } from "./Bindings";
import { GamepadInput } from "./Gamepad";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";

export class Input {
  readonly keyboard = new Keyboard();
  readonly mouse = new Mouse();
  readonly gamepad = new GamepadInput();
  readonly bindings = new Bindings();

  update() {
    this.keyboard.update();
    this.mouse.update();
    this.gamepad.update();
  }

  actionDown(action: string) {
    const binding = this.bindings.get(action);
    const key = binding.keys?.some((code) => this.keyboard.isDown(code)) ?? false;
    const button = binding.buttons?.some((idx) => this.gamepad.isDown(idx)) ?? false;
    return key || button;
  }

  actionPressed(action: string) {
    const binding = this.bindings.get(action);
    const key = binding.keys?.some((code) => this.keyboard.wasPressed(code)) ?? false;
    const button = binding.buttons?.some((idx) => this.gamepad.wasPressed(idx)) ?? false;
    return key || button;
  }

  actionReleased(action: string) {
    const binding = this.bindings.get(action);
    const key = binding.keys?.some((code) => this.keyboard.wasReleased(code)) ?? false;
    const button = binding.buttons?.some((idx) => this.gamepad.wasReleased(idx)) ?? false;
    return key || button;
  }
}
