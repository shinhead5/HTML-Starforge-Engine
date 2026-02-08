import { Easing } from "../math/Easing";
import { Tween, type TweenTarget } from "./Tween";

export type EasingFunction = (t: number) => number;

export class TweenManager {
  private tweens: Tween[] = [];

  tween(target: TweenTarget, to: TweenTarget, duration: number, easing: EasingFunction = Easing.linear, onComplete?: () => void) {
    const tween = new Tween(target, to, duration, easing, onComplete);
    this.tweens.push(tween);
    return tween;
  }

  update(dt: number) {
    this.tweens = this.tweens.filter((tween) => {
      tween.update(dt);
      return !tween.isFinished();
    });
  }
}
