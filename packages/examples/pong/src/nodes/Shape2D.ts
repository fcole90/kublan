import { Vector2DInitializer } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";
import { Node2D, Node2DConfig } from "./Node2D";

export const shape2Dtypes = {
  rectangle: 'rectangle'
} as const

export type Shape2DType = keyof typeof shape2Dtypes

export interface Shape2DConfig extends Node2DConfig {
  size: Vector2DInitializer
  color?: string
  shapeType: Shape2DType
}


export class Shape2D extends Node2D {
  color: string
  shapeType: Shape2DType

  constructor(config: Shape2DConfig) {
    super(config)
    this.color = config.color ?? 'white'
    this.shapeType = config.shapeType
  }

  start(): void { }

  update(eps: number): void { }

  render(renderer: Renderer) {
    switch (this.shapeType) {
      case shape2Dtypes.rectangle: {
        renderer.drawRectangle([...this.getAbsolutePosition().toArray(), ...this.getSize().toArray()], this.color)
        break
      }

      default:
        throw new Error('Shape ' + this.shapeType + 'not supported')
    }
  }
}
