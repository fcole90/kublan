import { Vector2, Vector2Initializer } from "../primitives/Vector2";
import { Renderer } from "../render/Renderer";
import { BaseNode, BaseNodeConfig } from "./BaseNode";
import { Drawable, DrawableConfig, isDrawableNode } from "./Drawable";


export interface Node2DConfig extends BaseNodeConfig, DrawableConfig {
  position: Vector2Initializer
}


export class Node2D extends BaseNode implements Drawable {
  private readonly position: Vector2

  constructor(config: Node2DConfig) {
    super(config)
    this.position = new Vector2(config.position)
  }

  public draw(renderer: Renderer): void {
    this.__draw(renderer)
    for (const [_, child] of this.getChildren()) {
      if (isDrawableNode(child)) {
        child.draw(renderer)
      }
    }
  }

  public getPosition(): Vector2 {
    return this.position.copy()
  }

  public setPosition(position: Readonly<Vector2>) {
    this.position.x = position.x
    this.position.y = position.y
  }

  /** Override this method in your custom node class. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected __draw(renderer: Renderer): void { }
}
