import type { EasingFunction } from "./TweenManager";

export type TweenTarget = Record<string, number>;

export class Tween {
  private elapsed = 0;
  private from: TweenTarget = {};
  private to: TweenTarget;
  private done = false;

  constructor(
    private target: TweenTarget,
    to: TweenTarget,
    private duration: number,
    private easing: EasingFunction,
    private onComplete?: () => void
  ) {
    this.to = { ...to };
    for (const key of Object.keys(to)) {
      this.from[key] = target[key] ?? 0;
    }
  }

  update(dt: number) {
    if (this.done) return;
    this.elapsed += dt;
    const t = Math.min(this.elapsed / this.duration, 1);
    const eased = this.easing(t);
    for (const key of Object.keys(this.to)) {
      const start = this.from[key] ?? 0;
      const end = this.to[key] ?? 0;
      this.target[key] = start + (end - start) * eased;
    }
    if (t >= 1) {
      this.done = true;
      this.onComplete?.();
    }
  }

  isFinished() {
    return this.done;
  }
}
