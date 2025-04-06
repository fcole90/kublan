export type Vector2Array = [number, number];

export interface Vector2Interface {
  x: number;
  y: number;
}

export type Vector2Initializer = Readonly<
  Vector2Interface | Vector2Array | Vector2
>;

export class Vector2 {
  x: number;
  y: number;

  static getDistance(pointA: Vector2, pointB: Vector2) {
    return pointA.sub(pointB).length();
  }

  static from(initializer?: Vector2Initializer) {
    if (initializer == null) {
      return new Vector2();
    }

    if (initializer instanceof Array) {
      return new Vector2(initializer[0], initializer[1]);
    }

    return new Vector2(initializer.x, initializer.y);
  }

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? this.x;
  }

  isNull() {
    return this.x === 0 && this.y === 0;
  }

  add(vectorOperand: Readonly<Vector2>) {
    return new Vector2(this.x + vectorOperand.x, this.y + vectorOperand.y);
  }

  sub(vectorOperand: Readonly<Vector2>) {
    return new Vector2(this.x - vectorOperand.x, this.y - vectorOperand.y);
  }

  mul(scalar: number) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  dot(vectorOperand: Readonly<Vector2>): number {
    return this.x * vectorOperand.x + this.y * vectorOperand.y;
  }

  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalized() {
    const magnitude = this.length();
    if (magnitude === 0) {
      return new Vector2();
    }

    return new Vector2(this.x / magnitude, this.y / magnitude);
  }

  toArray(): Vector2Array {
    return [this.x, this.y];
  }

  copy(): Vector2 {
    return Vector2.from(this);
  }

  updateInPlace(updateVector: Vector2Initializer): void {
    if (updateVector instanceof Array) {
      this.x = updateVector[0];
      this.y = updateVector[1];
    } else {
      this.x = updateVector.x;
      this.y = updateVector.y;
    }
  }
}
