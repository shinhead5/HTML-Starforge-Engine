export class Rect {
  constructor(public x = 0, public y = 0, public width = 0, public height = 0) {}

  contains(px: number, py: number) {
    return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
  }

  intersects(other: Rect) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
