import { Line, Vector } from "@rgsoft/math";

export class Triangle {

  private readonly _a: Vector;

  private readonly _b: Vector;

  private readonly _c: Vector;

  private readonly _center: Vector;

  private readonly _radius: number;

  constructor(a: Vector, b: Vector, c: Vector) {
    this._a = a;
    this._b = b;
    this._c = c;
    
    const med1 = Line.mediatrix(this._a, this._b);
    const med2 = Line.mediatrix(this._b, this._c);

    if (med1.m === med2.m || (isNaN(med1.m) && isNaN(med2.m))) {
      console.log({x: this._a.x, y: this._a.y}, {x: this._b.x, y: this._b.y}, {x: this._c.x, y: this._c.y}, med1, med2);
      throw new Error('The points are colinear');
    }

    this._center = med1.intersectionPoint(med2);
    this._radius = Math.sqrt((this._a.x - this._center.x) * (this._a.x - this._center.x) + (this._a.y - this._center.y) * (this._a.y - this._center.y))
  }

  get a(): Vector {
    return this._a;
  }

  get b(): Vector {
    return this._b;
  }

  get c(): Vector {
    return this._c;
  }

  get center(): Vector {
    return this._center;
  }

  get radius(): number {
    return this._radius;
  }

  inCircle(point: Vector): boolean {
    const d = (point.x - this._center.x) * (point.x - this._center.x) + (point.y - this._center.y) * (point.y - this._center.y);
    return d < this._radius * this._radius;
  }

  hasEdge(a: Vector, b: Vector): boolean {

    if (this._a.equals(a)) {
      if (this._b.equals(b) || this._c.equals(b)) {
        return true
      } else {
        return false;
      }
    } else if (this._b.equals(a)) {
      if (this._a.equals(b) || this._c.equals(b)) {
        return true
      } else {
        return false;
      }
    } else if (this._c.equals(a)) {
      if (this._a.equals(b) || this._b.equals(b)) {
        return true
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  hasVertex(v: Vector): boolean {
    return this._a.equals(v) || this._b.equals(v) || this._c.equals(v);
  }
  
  isAdjacent(triangle: Triangle): boolean {
    let matchingVertex = 0;
    [
      [ triangle.a, this._a ],
      [ triangle.a, this._b ],
      [ triangle.a, this._c ],
      [ triangle.b, this._a ],
      [ triangle.b, this._b ],
      [ triangle.b, this._c ],
      [ triangle.c, this._a ],
      [ triangle.c, this._b ],
      [ triangle.c, this._c ],
    ].forEach( ([v1, v2]) => {
      matchingVertex += (v1.x === v2.x && v1.y === v2.y) ? 1 : 0}
    );
    return matchingVertex === 2;
  }

}