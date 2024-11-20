import { Rectangle, RectangleInitializer } from "../primitives/Rectangle";
import { Vector2D, Vector2DInitializer } from "../primitives/Vector2D";
import { Node } from "./Node"

export class RectangleNode extends Node {
  rect: Rectangle

  constructor(rectangle: RectangleInitializer) {
    super()
    this.rect = new Rectangle(rectangle)
  }

  updatePosition(position: Vector2DInitializer) {
    const positonVector = new Vector2D(position)
    this.rect.x = positonVector.x
    this.rect.y = positonVector.y
  }
}
