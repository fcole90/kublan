import { Rectangle, RectangleInitializer } from "../primitives/Rectangle";
import { Vector2D } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";
import { BaseNode, BaseNodeConfig } from "./BaseNode";

export interface RectangleNodeConfig extends BaseNodeConfig {
  size: Vector2D
}

export class RectangleNode extends BaseNode {
  size: Vector2D
  color: string = 'white'

  constructor(config: RectangleNodeConfig) {
    super(config)
    this.size = new Vector2D(config.size)
  }

  render(renderer: Renderer) {
    renderer.drawRectangle([...this.getAbsolutePosition().toArray(), ...this.size.toArray()], this.color)
  }
}
