import { Vector2 } from "./Vector2"

export type RectangleArray = [number, number, number, number]

export interface RectangleInterface {
  x: number
  y: number
  w: number
  h: number
}

export type RectangleInitializer = RectangleArray | RectangleInterface | Rectangle

export class Rectangle {
  x: number
  y: number
  w: number
  h: number

  constructor(initializer: RectangleInitializer) {
    if (initializer instanceof Array) {
      this.x = initializer[0]
      this.y = initializer[1]
      this.w = initializer[2]
      this.h = initializer[3]
    } else {
      this.x = initializer.x
      this.y = initializer.y
      this.w = initializer.w
      this.h = initializer.h
    }
  }

  getPosition() {
    return new Vector2([this.x, this.y])
  }

  getCenter() {
    return new Vector2([
      (this.w - this.x / 2),
      (this.h - this.y / 2),
    ])
  }

  getSize() {
    return new Vector2([this.w, this.h])
  }

  toArray(): RectangleArray {
    return [this.x, this.y, this.w, this.h]
  }
}