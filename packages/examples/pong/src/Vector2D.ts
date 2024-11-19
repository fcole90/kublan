export type Vector2DArray = [number, number]

export interface Vector2DInterface {
  x: number,
  y: number
}

export type Vector2DInitializer = Vector2DInterface | Vector2DArray | Vector2D

export class Vector2D {
  x: number
  y: number

  constructor(initializer: Vector2DInitializer) {
    if (initializer instanceof Array) {
      this.x = initializer[0]
      this.y = initializer[1]
    } else {
      this.x = initializer.x
      this.y = initializer.y
    }
  }
}
