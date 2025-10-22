import { Line, Vector } from "@rgsoft/math";

export class Triangle {

  public readonly center: Vector;

  public readonly radius: number;

  constructor(public readonly a: Vector, public readonly b: Vector, public readonly c: Vector) {    
    const med1 = Line.mediatrix(a, b);
    const med2 = Line.mediatrix(b, c);

    if (med1.m === med2.m || (isNaN(med1.m) && isNaN(med2.m))) {
      console.error({x: a.x, y: a.y}, {x: b.x, y: b.y}, {x: c.x, y: c.y}, med1, med2);
      throw new Error('The points are colinear');
    }

    this.center = med1.intersectionPoint(med2);
    this.radius = Math.sqrt((this.a.x - this.center.x) * (this.a.x - this.center.x) + (this.a.y - this.center.y) * (this.a.y - this.center.y))
  }

  inCircle(point: Vector): boolean {
    const d = (point.x - this.center.x) * (point.x - this.center.x) + (point.y - this.center.y) * (point.y - this.center.y);
    return d < this.radius * this.radius;
  }

  hasEdge(a: Vector, b: Vector): boolean {

    if (this.a.equals(a)) {
      if (this.b.equals(b) || this.c.equals(b)) {
        return true
      } else {
        return false;
      }
    } else if (this.b.equals(a)) {
      if (this.a.equals(b) || this.c.equals(b)) {
        return true
      } else {
        return false;
      }
    } else if (this.c.equals(a)) {
      if (this.a.equals(b) || this.b.equals(b)) {
        return true
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  hasVertex(v: Vector): boolean {
    return this.a.equals(v) || this.b.equals(v) || this.c.equals(v);
  }
  
  isAdjacent(triangle: Triangle): boolean {
    let matchingVertex = 0;
    [
      [ triangle.a, this.a ],
      [ triangle.a, this.b ],
      [ triangle.a, this.c ],
      [ triangle.b, this.a ],
      [ triangle.b, this.b ],
      [ triangle.b, this.c ],
      [ triangle.c, this.a ],
      [ triangle.c, this.b ],
      [ triangle.c, this.c ],
    ].forEach( ([v1, v2]) => {
      matchingVertex += (v1.x === v2.x && v1.y === v2.y) ? 1 : 0}
    );
    return matchingVertex === 2;
  }

}