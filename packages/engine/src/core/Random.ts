export class Random {
  private seedValue: number;

  constructor(seed = Date.now()) {
    this.seedValue = seed;
  }

  seed(seed: number) {
    this.seedValue = seed;
  }

  next() {
    // Mulberry32
    let t = (this.seedValue += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(min: number, max: number) {
    return min + (max - min) * this.next();
  }

  int(min: number, max: number) {
    return Math.floor(this.range(min, max + 1));
  }

  pick<T>(items: T[]) {
    return items[this.int(0, items.length - 1)];
  }
}
