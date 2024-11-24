import { Vector2, Vector2DInitializer } from "../primitives/Vector2";
import { Renderer } from "../render/Renderer";

export const treeApply = (node: Node2D, callBack: (node: Node2D) => void) => {
  for (const childNode of node.getChildren()) {
    callBack(childNode)
    treeApply(childNode, callBack)
  }
}

export const treeToArray = (node: Node2D): Node2D[] => {
  const nodeArray: Node2D[] = [node]
  for (const childNode of node.getChildren()) {
    nodeArray.push(...treeToArray(childNode))
  }

  return nodeArray
}

export interface Node2DConfig {
  id?: string
  position?: Vector2DInitializer
  absoluteParentPosition?: Vector2DInitializer
  size?: Vector2DInitializer
}

export class Node2D {
  public readonly id: symbol
  private absoluteParentPosition: Vector2
  private position: Vector2
  private size: Vector2
  private children: Array<Node2D> = []

  constructor(config: Node2DConfig) {
    this.position = new Vector2(config.position)
    this.size = new Vector2(config.size)
    this.absoluteParentPosition = new Vector2(config.absoluteParentPosition)
    this.id = Symbol(config.id)
  }

  addChildNode(childNode: Node2D) {
    childNode.setAbsoluteParentPosition(this.getAbsolutePosition())
    this.children.push(childNode)
  }

  getChildren(): Readonly<Array<Node2D>> {
    return this.children
  }

  getPosition(): Readonly<Vector2> {
    return this.position
  }

  setPosition(position: Vector2DInitializer) {
    this.position = new Vector2(position)
  }

  setAbsoluteParentPosition(position: Vector2DInitializer) {
    this.absoluteParentPosition = new Vector2(position)
  }

  getAbsolutePosition(): Readonly<Vector2> {
    return this.absoluteParentPosition.add(this.position)
  }

  getSize(): Readonly<Vector2> {
    return this.size
  }

  setSize(size: Vector2DInitializer) {
    this.size = new Vector2(size)
  }

  start() { }

  update(_eps: number) { }

  render(_renderer: Renderer) { }
}