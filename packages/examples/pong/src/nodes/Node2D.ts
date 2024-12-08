import { Vector2, Vector2Initializer } from "../primitives/Vector2";
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
  position?: Vector2Initializer
  absoluteParentPosition?: Vector2Initializer
  size?: Vector2Initializer
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

  addChild(childNode: Node2D) {
    this.children.push(childNode)
    childNode._enterTree()
  }

  removeChild(childNode: Node2D) {
    const nodeIndex = this.children.findIndex((node) => node === childNode)
    this.children.splice(nodeIndex, 1)
    childNode._exitTree()
  }

  getChildren(): Readonly<Array<Node2D>> {
    return this.children
  }

  getPosition(): Readonly<Vector2> {
    return this.position
  }

  setPosition(position: Vector2Initializer) {
    this.position = new Vector2(position)
  }

  translate(offset: Vector2Initializer) {
    this.setPosition(this.position.add(new Vector2(offset)))
  }

  _setAbsoluteParentPosition(position: Vector2Initializer) {
    this.absoluteParentPosition = new Vector2(position)
  }

  _getAbsolutePosition(): Readonly<Vector2> {
    return this.absoluteParentPosition.add(this.position)
  }

  getSize(): Readonly<Vector2> {
    return this.size
  }

  setSize(size: Vector2Initializer) {
    this.size = new Vector2(size)
  }

  _enterTree() { }

  _exitTree() { }

  _ready() { }

  _input(_event: unknown[]) { }

  _process(_delta: number) { }

  _draw(_renderer: Renderer) { }
}