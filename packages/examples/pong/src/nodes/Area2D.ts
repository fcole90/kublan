import { Node2D, treeApply } from "./Node2D";



export class Area2D extends Node2D {
  constructor() {
    super({ initialPosition: [20, 20] })
  }

  start(...args: Parameters<Node2D['start']>) {
    treeApply(this, (node) => node.start(...args))
  }

  update(...args: Parameters<Node2D['update']>) {
    treeApply(this, (node) => {
      node.update(...args)
      for (const childNode of node.getChildren()) {
        childNode.setParentPosition(node.getPosition())
      }
    })
  }

  render(...args: Parameters<Node2D['render']>) {
    treeApply(this, (node) => node.render(...args))
  }
}