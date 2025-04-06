import { Vector2, Vector2Initializer } from "../primitives/Vector2"

export type NodeId = string
export type NodeMap = Map<NodeId, BaseNode>
export type ReadonlyNodeMap = ReadonlyMap<NodeId, BaseNode>

export interface BaseNodeConfig {
  name?: string
  children?: ReadonlyArray<BaseNode> | ReadonlyNodeMap
  position?: Vector2Initializer
}

const NODE_NAME = "BaseNode"


export class BaseNode {
  public readonly id: NodeId;
  public readonly name: string;

  private __isOnTree: boolean = false;
  private __isRoot: boolean = false;
  private __parentNode: BaseNode | null = null;

  private readonly childrenMap: NodeMap;
  protected position: Vector2

  constructor(config?: BaseNodeConfig) {
    this.id = crypto.randomUUID()
    this.name = config?.name ?? `${NODE_NAME}-${this.id}`;
    this.position = Vector2.from(config?.position)

    // Children
    this.childrenMap = new Map<string, BaseNode>()
    if (config?.children instanceof Array) {
      for (const child of config.children) {
        this.addChild(child)
      }
    } else if (config?.children instanceof Map) {
      for (const [_, child] of config.children as ReadonlyNodeMap) {
        this.addChild(child)
      }
    }
  }

  public getPosition(): Vector2 {
    return this.position.copy()
  }

  public getAbsolutePosition(): Vector2 {
    const parentPosition = this.getParent()?.getAbsolutePosition() ?? new Vector2()
    return parentPosition.add(this.position)
  }

  public setPosition(position: Readonly<Vector2>) {
    this.position.updateInPlace(position)
  }

  public addChild(childNode: BaseNode) {
    this.__addChild(childNode)
    this.onAdded(this)
    if (this.__isOnTree && !childNode.isOnTree()) {
      childNode.onEnterTree();
    }
    if (!this.__isOnTree && childNode.isOnTree()) {
      childNode.onEnterTree();
    }
  }

  public transferChild(childNode: BaseNode, parentNode: BaseNode) {
    this.__removeChild(childNode.id)
    childNode.onRemoved()
    parentNode.addChild(childNode)
  }

  public removeChild(childNode: BaseNode) {
    this.__removeChild(childNode.id)
    childNode.onRemoved()
    if (this.__isOnTree && childNode.isOnTree()) {
      childNode.onExitTree();
    }
  }

  public isOnTree() {
    return this.__isOnTree
  }

  public isRoot() {
    return this.__isRoot
  }

  public setRoot(isRoot: boolean) {
    this.__isRoot = isRoot
  }

  public getChildren(): ReadonlyNodeMap {
    return this.childrenMap;
  }

  public getParent(): Readonly<BaseNode | null> {
    return this.__parentNode;
  }

  public onAdded(parentNode: BaseNode): void {
    this.__parentNode = parentNode
    this._onAdded(parentNode)
  }

  public onRemoved(): void {
    this.__parentNode = null;
    this._onRemoved()
  }

  public onEnterTree() {
    this.__isOnTree = true
    this._onEnterTree()
    for (const [_, childNode] of this.childrenMap) {
      if (!childNode.isOnTree()) {
        childNode.onEnterTree()
      }
    }
  }

  public onExitTree() {
    this.__isOnTree = false
    this._onExitTree()
    for (const [_, childNode] of this.childrenMap) {
      if (childNode.isOnTree()) {
        childNode.onExitTree()
      }
    }
  }

  public process(delta: number): void {
    this._process(delta)
    for (const [_, child] of this.childrenMap) {
      child.process(delta)
    }
  }

  /** Override this method in your custom node class. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _onAdded(parentNode: BaseNode): void { }

  /** Override this method in your custom node class. */
  protected _onRemoved(): void { }

  /** Override this method in your custom node class. */
  protected _onEnterTree(): void { }

  /** Override this method in your custom node class. */
  protected _onExitTree(): void { }

  /** Override this method in your custom node class. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _process(delta: number): void { }

  /**
   * @throws If the node does not exist.
   */
  private __removeChild(childNodeId: string): void {
    const existed = this.childrenMap.delete(childNodeId)
    if (!existed) {
      throw new Error(`Attempted removing nonexisting child node with id "${childNodeId}" from node with id "${this.id}".`)
    }
  }

  /**
   * @throws If the node already exists.
   */
  private __addChild(childNode: BaseNode): void {
    if (this.childrenMap.has(childNode.id)) {
      throw new Error(`Attempted adding already existing child node with id "${childNode.id}" from node with id "${this.id}".`)
    }
    this.childrenMap.set(childNode.id, childNode)
  }
}
