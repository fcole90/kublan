import { Rectangle, RectangleInitializer } from "../primitives/Rectangle";
import { Vector2D } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";
import { BaseNode } from "./Node"

export class RectangleNode extends BaseNode {
  rect: Rectangle
  color: string = 'white'

  constructor(rectangle: RectangleInitializer) {
    super()
    this.rect = new Rectangle(rectangle)
  }

  updatePosition(position: Vector2D) {
    this.rect.x = position.x
    this.rect.y = position.y
  }

  render(renderer: Renderer, basePosition?: Vector2D) {
    const position = basePosition != null ? this.rect.getPosition().add(basePosition) : this.rect.getPosition()
    renderer.drawRectangle(new Rectangle([position.x, position.y, this.rect.w, this.rect.h]), this.color)
  }
}
