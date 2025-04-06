export type Vector2Array = [number, number]

export interface Vector2Interface {
  x: number,
  y: number
}

export type Vector2Initializer = Readonly<Vector2Interface | Vector2Array | Vector2>

export class Vector2 {
  x: number
  y: number

  static getDistance(pointA: Vector2Initializer, pointB: Vector2Initializer) {
    return new Vector2(pointA).sub(new Vector2(pointB)).magnitude()
  }

  constructor(initializer?: Vector2Initializer) {
    if (initializer == null) {
      this.x = 0
      this.y = 0
      return
    }

    if (initializer instanceof Array) {
      this.x = initializer[0]
      this.y = initializer[1]
    } else {
      this.x = initializer.x
      this.y = initializer.y
    }
  }

  isNull() {
    return this.x === 0 && this.y === 0
  }

  add(vectorOperand: Readonly<Vector2>) {
    const result = new Vector2([
      this.x + vectorOperand.x,
      this.y + vectorOperand.y
    ])
    return result
  }

  sub(vectorOperand: Readonly<Vector2>) {
    return new Vector2([
      this.x - vectorOperand.x,
      this.y - vectorOperand.y
    ])
  }

  mul(scalar: number) {
    return new Vector2([
      this.x * scalar,
      this.y * scalar,
    ])
  }

  dot(vectorOperand: Readonly<Vector2>): number {
    return this.x * vectorOperand.x + this.y * vectorOperand.y
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  norm() {
    const magnitude = this.magnitude()
    if (magnitude === 0) {
      return new Vector2([0, 0])
    }

    return new Vector2([this.x / magnitude, this.y / magnitude])
  }

  toArray(): Vector2Array {
    return [this.x, this.y]
  }

  copy(): Vector2 {
    return new Vector2(this)
  }

  update(updateVector: Vector2Initializer): void {
    if (updateVector instanceof Array) {
      this.x = updateVector[0]
      this.y = updateVector[1]
    } else {
      this.x = updateVector.x
      this.y = updateVector.y
    }
  }
}
