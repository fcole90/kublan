import { BaseNode, treeApply } from "./BaseNode";



export class RootNode extends BaseNode {
  constructor() {
    super({ initialPosition: [20, 20] })
  }

  start(...args: Parameters<BaseNode['start']>) {
    treeApply(this, (node) => node.start(...args))
  }

  update(...args: Parameters<BaseNode['update']>) {
    treeApply(this, (node) => {
      node.update(...args)
      for (const childNode of node.getChildren()) {
        childNode.setParentPosition(node.getPosition())
      }
    })
  }

  render(...args: Parameters<BaseNode['render']>) {
    treeApply(this, (node) => node.render(...args))
  }
}