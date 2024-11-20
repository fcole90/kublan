import { Vector2D } from "./Vector2D"

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
    return new Vector2D([this.x, this.y])
  }

  getSize() {
    return new Vector2D([this.w, this.h])
  }
}