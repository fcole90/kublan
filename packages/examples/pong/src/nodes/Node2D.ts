import { Vector2D, Vector2DInitializer } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";

export const treeApply = (node: Node2D, callBack: (node: Node2D) => void) => {
  for (const childNode of node.getChildren()) {
    callBack(childNode)
    treeApply(childNode, callBack)
  }
}

export interface Node2DConfig {
  id?: string
  position?: Vector2DInitializer
  absoluteParentPosition?: Vector2DInitializer
  size?: Vector2DInitializer
}

export class Node2D {
  public readonly id: symbol
  private absoluteParentPosition: Vector2D
  private position: Vector2D
  private size: Vector2D
  private children: Array<Node2D> = []

  constructor(config: Node2DConfig) {
    this.position = new Vector2D(config.position)
    this.size = new Vector2D(config.size)
    this.absoluteParentPosition = new Vector2D(config.absoluteParentPosition)
    this.id = Symbol(config.id)
  }

  addChildNode(childNode: Node2D) {
    childNode.setAbsoluteParentPosition(this.getAbsolutePosition())
    this.children.push(childNode)
  }

  getChildren(): Readonly<Array<Node2D>> {
    return this.children
  }

  getPosition(): Readonly<Vector2D> {
    return this.position
  }

  setPosition(position: Vector2DInitializer) {
    this.position = new Vector2D(position)
  }

  setAbsoluteParentPosition(position: Vector2DInitializer) {
    this.absoluteParentPosition = new Vector2D(position)
  }

  getAbsolutePosition(): Readonly<Vector2D> {
    return this.absoluteParentPosition.add(this.position)
  }

  getSize(): Readonly<Vector2D> {
    return this.size
  }

  setSize(size: Vector2DInitializer) {
    this.size = new Vector2D(size)
  }

  start() { }

  update(eps: number) { }

  render(renderer: Renderer) { }
}