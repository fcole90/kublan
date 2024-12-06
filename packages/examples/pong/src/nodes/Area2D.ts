import { detectCollisions } from "../phys/collisions";
import { Collider2D } from "./Collider2D";
import { Node2D, treeApply, treeToArray } from "./Node2D";


export class Area2D extends Node2D {
  constructor() {
    super({
      position: [0, 0]
    })
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
      // Apply collision
      if (node instanceof Collider2D) {
        node.setColliders(collidedCollidersMap[node.id])
      }
      // Apply update
      node.update(...args)

      // Update children's position relatively to the parent node
      for (const childNode of node.getChildren()) {
        childNode.setAbsoluteParentPosition(node.getAbsolutePosition())
      }
    })
  }

  render(...args: Parameters<Node2D['render']>) {
    treeApply(this, (node) => { node.render(...args) })
  }
}