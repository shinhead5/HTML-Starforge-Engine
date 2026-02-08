export class Color {
  constructor(public r = 255, public g = 255, public b = 255, public a = 1) {}

  static fromHex(hex: string, alpha = 1) {
    const value = hex.replace("#", "");
    const num = Number.parseInt(value, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return new Color(r, g, b, alpha);
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  lerp(to: Color, t: number) {
    const lerp = (a: number, b: number) => a + (b - a) * t;
    return new Color(lerp(this.r, to.r), lerp(this.g, to.g), lerp(this.b, to.b), lerp(this.a, to.a));
  }
}
