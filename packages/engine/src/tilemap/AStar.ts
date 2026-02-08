import type { Tilemap } from "./Tilemap";

export type GridPoint = { x: number; y: number };

export class AStar {
  static findPath(tilemap: Tilemap, start: GridPoint, goal: GridPoint, allowDiagonal = false) {
    const open: GridPoint[] = [start];
    const cameFrom = new Map<string, GridPoint>();
    const gScore = new Map<string, number>([[AStar.key(start), 0]]);
    const fScore = new Map<string, number>([[AStar.key(start), AStar.heuristic(start, goal)]]);

    while (open.length > 0) {
      open.sort((a, b) => (fScore.get(AStar.key(a)) ?? Infinity) - (fScore.get(AStar.key(b)) ?? Infinity));
      const current = open.shift()!;
      if (current.x === goal.x && current.y === goal.y) {
        return AStar.reconstruct(cameFrom, current);
      }

      for (const neighbor of AStar.neighbors(current, allowDiagonal)) {
        if (tilemap.isBlocked(neighbor.x, neighbor.y)) continue;
        const tentative = (gScore.get(AStar.key(current)) ?? Infinity) + 1;
        const key = AStar.key(neighbor);
        if (tentative < (gScore.get(key) ?? Infinity)) {
          cameFrom.set(key, current);
          gScore.set(key, tentative);
          fScore.set(key, tentative + AStar.heuristic(neighbor, goal));
          if (!open.some((p) => p.x === neighbor.x && p.y === neighbor.y)) {
            open.push(neighbor);
          }
        }
      }
    }
    return [] as GridPoint[];
  }

  private static key(point: GridPoint) {
    return `${point.x},${point.y}`;
  }

  private static heuristic(a: GridPoint, b: GridPoint) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private static neighbors(point: GridPoint, allowDiagonal: boolean) {
    const results = [
      { x: point.x + 1, y: point.y },
      { x: point.x - 1, y: point.y },
      { x: point.x, y: point.y + 1 },
      { x: point.x, y: point.y - 1 }
    ];
    if (allowDiagonal) {
      results.push(
        { x: point.x + 1, y: point.y + 1 },
        { x: point.x - 1, y: point.y - 1 },
        { x: point.x + 1, y: point.y - 1 },
        { x: point.x - 1, y: point.y + 1 }
      );
    }
    return results;
  }

  private static reconstruct(cameFrom: Map<string, GridPoint>, current: GridPoint) {
    const path: GridPoint[] = [current];
    let key = AStar.key(current);
    while (cameFrom.has(key)) {
      const prev = cameFrom.get(key)!;
      path.unshift(prev);
      key = AStar.key(prev);
    }
    return path;
  }
}
