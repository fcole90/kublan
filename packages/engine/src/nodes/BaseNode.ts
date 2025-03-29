export interface BaseNodeConfig {
  name?: string
}

const NODE_NAME = "BaseNode"

export class BaseNode {
  readonly id: string;
  readonly name: string;
  protected readonly children: BaseNode[];

  private isOnTree_: boolean = false;

  constructor(config?: BaseNodeConfig) {
    this.id = crypto.randomUUID()
    this.name = config?.name ?? `${NODE_NAME}-${this.id}`;
    this.children = []
  }

  private _onEnterTree() {
    this.isOnTree_ = true
    this.onEnterTree()
  }

  private _onExitTree() {
    this.isOnTree_ = false
    this.onExitTree()
  }

  public isOnTree() {
    return this.isOnTree_
  }

  protected onEnterTree() { }
  protected onExitTree() { }

  addChild(childNode: BaseNode) {
    this.children.push(childNode);
    childNode._onEnterTree();
  }

  removeChild(childNode: BaseNode) {
    const nodeIndex = this.children.findIndex((node) => node === childNode);
    this.children.splice(nodeIndex, 1);
    childNode._onExitTree();
  }

  getChildren(): Readonly<Array<BaseNode>> {
    return this.children;
  }
}
