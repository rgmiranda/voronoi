import { Vector } from '@rgsoft/math';
import { Polygon } from './polygon';
import { triangulate } from './delaunay';
import { TessellationConfig } from './interfaces';

export const tessellate = (
  sites: Vector[],
  config: TessellationConfig,
): Polygon[] => {
  const polygons: Polygon[] = [];

  const triangulation = triangulate(sites, config);
  if (!config.excludeRectVertex && config.rectBox) {
    sites = sites.concat(config.rectBox);
  }

  for (const site of sites) {
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
    const v = config.rectBox?.find((v) => v.equals(site));
    if (v) {
      centers.push(v);
    }

    polygons.push(new Polygon(centers, site));
  }

  return polygons;
};
