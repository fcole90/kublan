export type Vector2DArray = [number, number]

export interface Vector2DInterface {
  x: number,
  y: number
}

export type Vector2DInitializer = Vector2DInterface | Vector2DArray | Vector2D

export class Vector2D {
  x: number
  y: number

  constructor(initializer?: Vector2DInitializer) {
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

  add(vectorOperand: Readonly<Vector2D>) {
    const result = new Vector2D([
      this.x + vectorOperand.x,
      this.y + vectorOperand.y
    ])
    return result
  }

  sub(vectorOperand: Readonly<Vector2D>) {
    return new Vector2D([
      this.x - vectorOperand.x,
      this.y - vectorOperand.y
    ])
  }

  norm() {
    const magnitude = Math.sqrt(this.x ** 2 + this.y ** 2)
    if (magnitude === 0) {
      return new Vector2D([0, 0])
    }

    return new Vector2D([this.x / magnitude, this.y / magnitude])
  }

  toArray(): Vector2DArray {
    return [this.x, this.y]
  }
}
