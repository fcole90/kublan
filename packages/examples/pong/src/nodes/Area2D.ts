import { detectCollisions } from "../phys/collisions";
import { Collider2D } from "./Collider2D";
import { Node2D, treeApply, treeToArray } from "./Node2D";



export class Area2D extends Node2D {
  constructor() {
    super({ position: [20, 20] })
  }

  start(...args: Parameters<Node2D['start']>) {
    treeApply(this, (node) => { node.start(...args) })
  }

  update(...args: Parameters<Node2D['update']>) {
    const colliders = treeToArray(this).filter(n => n instanceof Collider2D)

    const collisionsMap = detectCollisions(colliders)

    const collidedCollidersMap: Record<symbol, Collider2D[]> = {}
    for (const colliderA of colliders) {
      collidedCollidersMap[colliderA.id] = []
      for (const colliderB of colliders) {
        if (collisionsMap[colliderA.id][colliderB.id]) {
          collidedCollidersMap[colliderA.id].push(colliderB)
        }
      }
    }


    treeApply(this, (node) => {
      if (node instanceof Collider2D) {
        node.setColliders(collidedCollidersMap[node.id])
      }
      node.update(...args)
      for (const childNode of node.getChildren()) {
        childNode.setAbsoluteParentPosition(node.getPosition())
      }
    })
  }

  render(...args: Parameters<Node2D['render']>) {
    treeApply(this, (node) => { node.render(...args) })
  }
}