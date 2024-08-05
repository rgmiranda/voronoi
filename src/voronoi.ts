import { Vector } from "@rgsoft/math";
import { Triangle } from "./triangle";

export interface VoronoiConfig {
    width: number,
    height: number,
    excludeRectVertex?: boolean,
}

export class Voronoi {
  constructor (public readonly config: VoronoiConfig) {
  }

  public triangulate(points: Vector[]) : Triangle[] {

    const A = new Vector(0, 0);
    const B = new Vector(this.config.width, 0);
    const C = new Vector(this.config.width, this.config.height);
    const D = new Vector(0, this.config.height);

    let triangulation = [
      new Triangle(A, C, D),
      new Triangle(A, B, C),
    ];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      const badTriangles = triangulation.filter(t => t.inCircle(point));

      const polygon : Vector[] = [];

      for (let j = 0; j < badTriangles.length; j++) {
        const triangle = badTriangles[j];
        const edges = { a: true, b: true, c: true };
        for (let k = 0; k < badTriangles.length; k++) {
          if (k === j) {
            continue;
          }
          const triangle2 = badTriangles[k];
          edges.a = edges.a && !triangle2.hasEdge(triangle.a, triangle.b);
          edges.b = edges.b && !triangle2.hasEdge(triangle.b, triangle.c);
          edges.c = edges.c && !triangle2.hasEdge(triangle.c, triangle.a);
        }
        if (edges.a) {
          polygon.push(triangle.a, triangle.b);
        }
        if (edges.b) {
          polygon.push(triangle.b, triangle.c);
        }
        if (edges.c) {
          polygon.push(triangle.c, triangle.a);
        }
      }

      triangulation = triangulation.filter(t => !t.inCircle(point));

      for (let j = 0; j < polygon.length; j += 2) {
        triangulation.push(new Triangle(polygon[j], polygon[j + 1], point));
      }

    } // Next point

    return triangulation;
  }
}