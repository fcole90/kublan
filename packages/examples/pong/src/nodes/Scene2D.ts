import { detectCollisions } from "../phys/collisions/collisionDetection";
import { Collider2D } from "./Collider2D";
import { Node2D, treeApply, treeToArray } from "./Node2D";
import { PhysicsBody2D } from "./PhysicsBody2D";

export class Scene2D extends Node2D {
  constructor() {
    super({});
  }

  _ready(...args: Parameters<Node2D["_ready"]>) {
    console.log("Scene2D ready");
    treeApply(this, (node) => {
      node._ready(...args);
    });
  }

  _input(...args: Parameters<Node2D["_input"]>) {
    treeApply(this, (node) => {
      node._input(...args);
    });
  }

  _process(...args: Parameters<Node2D["_process"]>) {
    treeApply(this, (node) => {
      // Apply update
      node._process(...args);

      // Update children's position relatively to the parent node
      for (const childNode of node.getChildren()) {
        childNode._setAbsoluteParentPosition(node._getAbsolutePosition());
      }
    });
  }

  _physicsProcess(...args: Parameters<PhysicsBody2D["_physicsProcess"]>) {
    const colliders = treeToArray(this).filter((n) => n instanceof Collider2D);

    const collisionsMap = detectCollisions(colliders);

    const collidedCollidersMap: Record<symbol, Collider2D[]> = {};
    for (const colliderA of colliders) {
      collidedCollidersMap[colliderA.id] = [];
      for (const colliderB of colliders) {
        if (collisionsMap[colliderA.id][colliderB.id]) {
          collidedCollidersMap[colliderA.id].push(colliderB);
        }
      }
    }

    // Apply all updates
    treeApply(this, (node) => {
      if (!(node instanceof PhysicsBody2D)) {
        return;
      }

      // Apply update
      node._physicsProcess(...args);

      // Update children's position relatively to the parent node
      for (const childNode of node.getChildren()) {
        childNode._setAbsoluteParentPosition(node._getAbsolutePosition());
      }
    });

    // Apply all collisions
    treeApply(this, (node) => {
      if (node instanceof Collider2D) {
        node.setCollidedColliders(collidedCollidersMap[node.id]);
      }
    });
  }

  _draw(...args: Parameters<Node2D["_draw"]>) {
    treeApply(this, (node) => {
      node._draw(...args);
    });
  }
}
