import { Vector2Initializer } from "../primitives/Vector2";
import { Renderer } from "../render/Renderer";
import { BaseNode, BaseNodeConfig } from "./BaseNode";
import { Drawable, DrawableConfig, isDrawableNode } from "./Drawable";


export interface Node2DConfig extends BaseNodeConfig, DrawableConfig {
  position: Vector2Initializer
}


export class Node2D extends BaseNode implements Drawable {
  public draw(renderer: Renderer): void {
    this._draw(renderer)
    for (const [_, child] of this.getChildren()) {
      if (isDrawableNode(child)) {
        child.draw(renderer)
      }
    }
  }

  /** Override this method in your custom node class. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _draw(renderer: Renderer): void { }
}
