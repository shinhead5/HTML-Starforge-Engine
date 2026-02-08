export class Vec2 {
  constructor(public x = 0, public y = 0) {}

  static zero() {
    return new Vec2(0, 0);
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(v: Vec2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vec2) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length() {
    return Math.hypot(this.x, this.y);
  }

  normalize() {
    const len = this.length() || 1;
    this.x /= len;
    this.y /= len;
    return this;
  }

  distance(v: Vec2) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }
}
