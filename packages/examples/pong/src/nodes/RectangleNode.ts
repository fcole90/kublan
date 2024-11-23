import { Rectangle, RectangleInitializer } from "../primitives/Rectangle";
import { Vector2D, Vector2DInitializer } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";
import { BaseNode, BaseNodeConfig } from "./BaseNode";

export interface RectangleNodeConfig extends BaseNodeConfig {
  size: Vector2DInitializer
  color?: string
}

export class RectangleNode extends BaseNode {
  size: Vector2D
  color: string

  constructor(config: RectangleNodeConfig) {
    super(config)
    this.size = new Vector2D(config.size)
    this.color = config.color ?? 'white'
  }

  start(): void { }

  update(eps: number): void { }

  render(renderer: Renderer) {
    renderer.drawRectangle([...this.getAbsolutePosition().toArray(), ...this.size.toArray()], this.color)
  }
}
