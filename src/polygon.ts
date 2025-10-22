import { Vector } from '@rgsoft/math';

export class Polygon {

  constructor(public readonly vertex: Vector[], public readonly site: Vector) {
  }

  get centroid(): Vector {
    let x = 0,
      y = 0;
    this.vertex.forEach((v) => {
      x += v.x;
      y += v.y;
    });
    return new Vector(x / this.vertex.length, y / this.vertex.length);
  }

  contains(p: Vector): boolean {
    let inside = false;
    const n = this.vertex.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = this.vertex[i].x,
        yi = this.vertex[i].y;
      const xj = this.vertex[j].x,
        yj = this.vertex[j].y;
      const intersect =
        yi > p.y !== yj > p.y &&
        p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  containsOrOnEdge(p: Vector): boolean {
    return this.contains(p) || this.isOnEdge(p);
  }

  isOnEdge(p: Vector, tolerance = 1e-9): boolean {
    const n = this.vertex.length;
    for (let i = 0; i < n; i++) {
      const a = this.vertex[i];
      const b = this.vertex[(i + 1) % n];
      const cross = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
      const dot = (p.x - a.x) * (p.x - b.x) + (p.y - a.y) * (p.y - b.y);
      if (Math.abs(cross) < tolerance && dot <= 0) return true;
    }
    return false;
  }
}
