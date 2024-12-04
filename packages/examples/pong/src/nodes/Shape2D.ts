import { Vector2Initializer } from "../primitives/Vector2";
import { Renderer } from "../render/Renderer";
import { checkExhaustiveCondition } from "../utils/typing/checkExhaustiveConditon";
import { Node2D, Node2DConfig } from "./Node2D";

export const shape2Dtypes = {
  rectangle: 'rectangle',
  circle: 'circle',
} as const

export type Shape2DType = keyof typeof shape2Dtypes

export interface Shape2DConfig extends Node2DConfig {
  size: Vector2Initializer
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

  render(renderer: Renderer) {
    switch (this.shapeType) {

      case shape2Dtypes.rectangle: {
        renderer.drawRectangle([...this.getAbsolutePosition().toArray(), ...this.getSize().toArray()], this.color)
        break
      }

      case shape2Dtypes.circle: {
        const position = this.getAbsolutePosition()
        const size = this.getSize()
        renderer.drawCircle([position.x + (size.x / 2), position.y + (size.y / 2)], size.x / 2, this.color)
        break
      }

      default: {
        checkExhaustiveCondition(this.shapeType, (strRepr) => 'Shape ' + strRepr + 'not supported')
      }
    }
  }
}
