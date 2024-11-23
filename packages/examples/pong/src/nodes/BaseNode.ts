import { Vector2D, Vector2DInitializer } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";

export const treeApply = (node: BaseNode, callBack: (node: BaseNode) => void) => {
  for (const childNode of node.getChildren()) {
    callBack(childNode)
    treeApply(childNode, callBack)
  }
}

export interface BaseNodeConfig {
  initialPosition: Vector2DInitializer
}

export class BaseNode {
  private parentPosition: Vector2D
  private position: Vector2D
  private children: Array<BaseNode> = []

  constructor(config: BaseNodeConfig) {
    this.position = new Vector2D(config.initialPosition)
    this.parentPosition = new Vector2D([0, 0])
  }

  addChildNode(childNode: BaseNode) {
    this.children.push(childNode)
  }

  getChildren(): Readonly<Array<BaseNode>> {
    return this.children
  }

  getPosition() {
    return this.position
  }

  setPosition(position: Vector2D) {
    this.position = new Vector2D(position)
  }

  setParentPosition(position: Vector2D) {
    this.parentPosition = position
  }

  getAbsolutePosition() {
    return this.parentPosition.add(this.position)
  }

  start() { }

  update(eps: number) {
    console.warn('Update on a BaseNode has no effect')
  }

  render(renderer: Renderer) {
    console.warn('Render on a BaseNode has no effect')
  }


}