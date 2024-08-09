import { Triangle } from "./triangle";
import { Polygon } from "./polygon";
import { Vector } from "@rgsoft/math";

export const sortTriangles = (triangles: Triangle[]) : Triangle[] => {
  const sorted: Triangle[] = [];
  triangles.forEach(triangle => {
    let i = 0;
    while (i < sorted.length) {
      const ot = sorted[i];
      if (triangle.isAdjacent(ot)) {
        break;
      }
      i++;
    }
    if (i === sorted.length) {
      sorted.push(triangle);
      return;
    }
    if (i === sorted.length - 1) {
      sorted.splice(i, 0, triangle);
    }
    if (triangle.isAdjacent(sorted[i + 1])) {
      sorted.splice(i + 1, 0, triangle);
    } else {
      sorted.splice(i, 0, triangle);
    }
  });
  return sorted;
}

export const tessellate = (triangulation: Triangle[]): Polygon[] => {
  const polygons: Polygon[] = [];
  const processedPoints: Vector[] = [];
  triangulation.forEach((triangle, i) => {
    const trianglePoints = [triangle.a, triangle.b, triangle.c];

    trianglePoints.forEach(point => {
      if (processedPoints.includes(point)) {
        return;
      }
      processedPoints.push(point);
      let pointTriangles: Triangle[] = [ triangle ];
      for (let j = i + 1; j < triangulation.length; j++) {
        if (triangulation[j].hasVertex(point)) {
          pointTriangles.push(triangulation[j]);
        }
      }
      polygons.push(new Polygon(sortTriangles(pointTriangles).map(t => t.center)));
    });
  });
  return polygons;
};