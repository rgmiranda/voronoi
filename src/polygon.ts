import { Vector } from '@rgsoft/math';

export class Polygon {
  readonly vertices: Vector[];
  readonly site?: Vector; // opcional, el punto generador

  constructor(vertices: Vector[], site?: Vector) {
    this.vertices = vertices;
    this.site = site;
  }

  get centroid(): Vector {
    let x = 0,
      y = 0;
    this.vertices.forEach((v) => {
      x += v.x;
      y += v.y;
    });
    return new Vector(x / this.vertices.length, y / this.vertices.length);
  }

  contains(p: Vector): boolean {
    let inside = false;
    const n = this.vertices.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = this.vertices[i].x,
        yi = this.vertices[i].y;
      const xj = this.vertices[j].x,
        yj = this.vertices[j].y;
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
    const n = this.vertices.length;
    for (let i = 0; i < n; i++) {
      const a = this.vertices[i];
      const b = this.vertices[(i + 1) % n];
      const cross = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
      const dot = (p.x - a.x) * (p.x - b.x) + (p.y - a.y) * (p.y - b.y);
      if (Math.abs(cross) < tolerance && dot <= 0) return true;
    }
    return false;
  }
}
