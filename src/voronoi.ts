import { Vector } from '@rgsoft/math';
import { Triangle } from './triangle';
import { Polygon } from './polygon';

export const tessellate = (
  points: Vector[],
  triangulation: Triangle[],
  rectBox: [ Vector, Vector, Vector, Vector ] | null = null
): Polygon[] => {
  const polygons: Polygon[] = [];

  for (const site of points) {
    const incidentTriangles = triangulation.filter((t) => t.hasVertex(site));

    if (incidentTriangles.length < 2) {
      continue;
    }

    const centers = incidentTriangles.map((t) => t.center);

    centers.sort((p1, p2) => {
      const a1 = Math.atan2(p1.y - site.y, p1.x - site.x);
      const a2 = Math.atan2(p2.y - site.y, p2.x - site.x);
      return a1 - a2;
    });
    const v = rectBox?.find((v) => v.equals(site));
    if (v) {
      centers.push(v);
    }

    polygons.push(new Polygon(centers, site));
  }

  return polygons;
};
