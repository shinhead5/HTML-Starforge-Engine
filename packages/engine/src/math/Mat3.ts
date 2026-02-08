import { Vec2 } from "./Vec2";

export class Mat3 {
  data: number[];

  constructor() {
    this.data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  static identity() {
    return new Mat3();
  }

  translate(x: number, y: number) {
    this.data[6] += x;
    this.data[7] += y;
    return this;
  }

  scale(x: number, y: number) {
    this.data[0] *= x;
    this.data[4] *= y;
    return this;
  }

  rotate(rad: number) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const [a, b, , c0, d] = this.data;
    this.data[0] = a * c + c0 * s;
    this.data[1] = b * c + d * s;
    this.data[3] = c0 * c - a * s;
    this.data[4] = d * c - b * s;
    return this;
  }

  multiply(other: Mat3) {
    const a = this.data;
    const b = other.data;
    const out = new Mat3();
    const o = out.data;

    o[0] = a[0] * b[0] + a[3] * b[1] + a[6] * b[2];
    o[1] = a[1] * b[0] + a[4] * b[1] + a[7] * b[2];
    o[2] = a[2] * b[0] + a[5] * b[1] + a[8] * b[2];

    o[3] = a[0] * b[3] + a[3] * b[4] + a[6] * b[5];
    o[4] = a[1] * b[3] + a[4] * b[4] + a[7] * b[5];
    o[5] = a[2] * b[3] + a[5] * b[4] + a[8] * b[5];

    o[6] = a[0] * b[6] + a[3] * b[7] + a[6] * b[8];
    o[7] = a[1] * b[6] + a[4] * b[7] + a[7] * b[8];
    o[8] = a[2] * b[6] + a[5] * b[7] + a[8] * b[8];

    this.data = o;
    return this;
  }

  transform(v: Vec2) {
    const [a, b, , c, d, , e, f] = this.data;
    return new Vec2(v.x * a + v.y * c + e, v.x * b + v.y * d + f);
  }
}
