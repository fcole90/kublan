import { Vector2D, Vector2DInitializer } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";

export const treeApply = (node: Node2D, callBack: (node: Node2D) => void) => {
  for (const childNode of node.getChildren()) {
    callBack(childNode)
    treeApply(childNode, callBack)
  }
}

export interface Node2DConfig {
  initialPosition: Vector2DInitializer
}

export class Node2D {
  private parentPosition: Vector2D
  private position: Vector2D
  private children: Array<Node2D> = []

  constructor(config: Node2DConfig) {
    this.position = new Vector2D(config.initialPosition)
    this.parentPosition = new Vector2D([0, 0])
  }

  addChildNode(childNode: Node2D) {
    this.children.push(childNode)
  }

  getChildren(): Readonly<Array<Node2D>> {
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

  update(eps: number) { }

  render(renderer: Renderer) { }
}