export class Time {
  delta = 0;
  unscaledDelta = 0;
  elapsed = 0;
  fixedDelta: number;
  scale = 1;
  paused = false;
  smoothing = 0.9;

  private accumulator = 0;

  constructor(fixedDelta = 1 / 60) {
    this.fixedDelta = fixedDelta;
  }

  update(delta: number) {
    this.unscaledDelta = delta;
    this.delta = this.paused ? 0 : delta * this.scale;
    this.elapsed += this.delta;
    this.accumulator += this.delta;
  }

  shouldFixedUpdate(): boolean {
    return this.accumulator >= this.fixedDelta;
  }

  consumeFixedDelta() {
    this.accumulator -= this.fixedDelta;
  }

  reset() {
    this.delta = 0;
    this.unscaledDelta = 0;
    this.elapsed = 0;
    this.accumulator = 0;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }
}
