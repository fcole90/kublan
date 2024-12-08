export type Vector2Array = [number, number]

export interface Vector2Interface {
  x: number,
  y: number
}

export type Vector2Initializer = Readonly<Vector2Interface | Vector2Array | Vector2>

export class Vector2 {
  x: number
  y: number

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

  norm() {
    const magnitude = Math.sqrt(this.x ** 2 + this.y ** 2)
    if (magnitude === 0) {
      return new Vector2([0, 0])
    }

    return new Vector2([this.x / magnitude, this.y / magnitude])
  }

  toArray(): Vector2Array {
    return [this.x, this.y]
  }
}
