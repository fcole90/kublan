import {
  Vector2,
  Vector2Initializer,
} from '@kublan/engine/src/primitives/Vector2';
import { Renderer } from '@kublan/engine/src/render/Renderer';

export const treeApply = (node: Node2D, callBack: (node: Node2D) => void) => {
  for (const childNode of node.getChildren()) {
    callBack(childNode);
    treeApply(childNode, callBack);
  }
};

export const treeToArray = (node: Node2D): Node2D[] => {
  const nodeArray: Node2D[] = [node];
  for (const childNode of node.getChildren()) {
    nodeArray.push(...treeToArray(childNode));
  }

  return nodeArray;
};

export interface Node2DConfig {
  id?: string;
  position?: Vector2Initializer;
  absoluteParentPosition?: Vector2Initializer;
  size?: Vector2Initializer;
  children?: Node2D[];
}

export class Node2D {
  public readonly id: symbol;
  private absoluteParentPosition: Vector2;
  private position: Vector2;
  private size: Vector2;
  private children: Array<Node2D> = [];

  constructor(config: Node2DConfig) {
    this.position = Vector2.from(config.position);
    this.size = Vector2.from(config.size);
    this.absoluteParentPosition = Vector2.from(config.absoluteParentPosition);
    this.id = Symbol(config.id);
    if (config.children) {
      for (const child of config.children) {
        this.addChild(child);
      }
    }
  }

  addChild(childNode: Node2D) {
    this.children.push(childNode);
    childNode._enterTree();
  }

  removeChild(childNode: Node2D) {
    const nodeIndex = this.children.findIndex((node) => node === childNode);
    this.children.splice(nodeIndex, 1);
    childNode._exitTree();
  }

  getChildren(): Readonly<Array<Node2D>> {
    return this.children;
  }

  getPosition(): Readonly<Vector2> {
    return this.position;
  }

  setPosition(position: Vector2Initializer) {
    this.position = Vector2.from(position);
  }

  translate(offset: Vector2Initializer) {
    this.setPosition(this.position.add(Vector2.from(offset)));
  }

  _setAbsoluteParentPosition(position: Vector2Initializer) {
    this.absoluteParentPosition = Vector2.from(position);
  }

  _getAbsolutePosition(): Readonly<Vector2> {
    return this.absoluteParentPosition.add(this.position);
  }

  getSize(): Readonly<Vector2> {
    return this.size;
  }

  setSize(size: Vector2Initializer) {
    this.size = Vector2.from(size);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(...args: any[]) {
    console.log(
      `${Date.now().toString()} [${this.id.description ?? ''}]`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...args,
    );
  }

  _enterTree() {}

  _exitTree() {}

  _ready() {}

  _input(_event: unknown[]) {}

  _process(_delta: number) {}

  _draw(_renderer: Renderer) {}
}
