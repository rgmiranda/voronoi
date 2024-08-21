import { Vector } from "@rgsoft/math";
import { Triangle } from "./triangle";

export interface DalaunayConfig {
    rectBox?: Vector[]
    excludeRectVertex?: boolean,
}

export const getRectBox = (points: Vector[]) : Vector[] => {

  if(points.length === 0) {
    throw new Error('No points received');
  }

  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;

  points.forEach((p) => {
    if (p.x > maxX) {
      maxX = p.x;
    }
    if (p.x < minX) {
      minX = p.x;
    }
    if (p.y > maxY) {
      maxY = p.y;
    }
    if (p.y < minY) {
      minY = p.y;
    }
  });

  return [
    new Vector(minX, maxY),
    new Vector(maxX, maxY),
    new Vector(maxX, minY),
    new Vector(minX, minY),
  ];
};

export const triangulate = (points: Vector[], config: DalaunayConfig = {}) : Triangle[]  => {
  const [A, B, C, D] = (config.rectBox && config.rectBox.length >= 4) ? config.rectBox : getRectBox(points);

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

  }

  if (config.excludeRectVertex) {
    triangulation = triangulation.filter(t => !(t.hasVertex(A) || t.hasVertex(B) || t.hasVertex(C) || t.hasVertex(D)))
  }

  return triangulation;
};