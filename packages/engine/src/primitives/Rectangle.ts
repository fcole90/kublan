import { Vector2, Vector2Interface } from './Vector2';

export type RectangleArray = [number, number, number, number];

export interface RectangleInterface {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type RectangleInitializer =
  | RectangleArray
  | RectangleInterface
  | Rectangle;

export class Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(initializer: RectangleInitializer) {
    if (initializer instanceof Array) {
      this.x = initializer[0];
      this.y = initializer[1];
      this.w = initializer[2];
      this.h = initializer[3];
    } else {
      this.x = initializer.x;
      this.y = initializer.y;
      this.w = initializer.w;
      this.h = initializer.h;
    }
  }

  getPosition() {
    return Vector2.from([this.x, this.y]);
  }

  getCenter() {
    return Vector2.from([this.x + this.w / 2, this.y + this.h / 2]);
  }

  getSize() {
    return Vector2.from([this.w, this.h]);
  }

  getClosestPointOnPerimeter = (point: Vector2): Vector2 => {
    // Get the coordinates confined to the points of the rectangle (internal + perimeter)
    const internalX = Math.max(this.x, Math.min(point.x, this.x + this.w));
    const internalY = Math.max(this.y, Math.min(point.y, this.y + this.h));

    // If the closest point is not on the perimeter, return the closest point on the perimeter
    const diffX0 = Math.abs(internalX - this.x);
    const diffXW = Math.abs(internalX - (this.x + this.w));
    const diffX = Math.min(diffX0, diffXW);

    const diffY0 = Math.abs(internalY - this.y);
    const diffYH = Math.abs(internalY - (this.y + this.h));
    const diffY = Math.min(diffY0, diffYH);

    if (diffX < diffY) {
      return Vector2.from([
        diffX0 < diffXW ? this.x : this.x + this.w,
        internalY,
      ]);
    }

    return Vector2.from([
      internalX,
      diffY0 < diffYH ? this.y : this.y + this.h,
    ]);
  };

  getNormalAt(point: Vector2): Vector2 {
    if (
      !(
        point.x === this.x ||
        point.x === this.x + this.w ||
        point.y === this.y ||
        point.y === this.y + this.h
      )
    ) {
      console.warn('Point is not on the edge of the rectangle', point, this);
      return Vector2.from([NaN, NaN]);
    }

    const normalInitializer: Vector2Interface = { x: 0, y: 0 };
    if (point.x === this.x) {
      normalInitializer.x = -1;
    } else if (point.x === this.x + this.w) {
      normalInitializer.x = 1;
    }

    if (point.y === this.y) {
      normalInitializer.y = -1;
    } else if (point.y === this.y + this.h) {
      normalInitializer.y = 1;
    }

    return Vector2.from(normalInitializer).normalized();
  }

  getNormalTo(point: Vector2): Vector2 {
    return this.getNormalAt(this.getClosestPointOnPerimeter(point));
  }

  getTangentAt(point: Vector2): Vector2 {
    if (point.x === this.x || point.x === this.x + this.w) {
      return Vector2.from([1, 0]);
    }

    if (point.y === this.y || point.y === this.y + this.h) {
      return Vector2.from([0, 1]);
    }

    console.warn('Point is not on the edge of the rectangle', point, this);
    return Vector2.from([NaN, NaN]);
  }

  toArray(): RectangleArray {
    return [this.x, this.y, this.w, this.h];
  }
}
