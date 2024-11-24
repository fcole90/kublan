import { ColliderInterface, ColliderType, colliderTypes } from "../phys/ColliderInterface";
import { Vector2DInitializer } from "../primitives/Vector2D";
import { Node2D, Node2DConfig } from "./Node2D";

export interface Collider2DConfig extends Node2DConfig {
  colliderType: ColliderType
}

export type Collider2DMap = Record<symbol, Collider2D>

class Collider2D extends Node2D implements ColliderInterface {
  colliderType: ColliderType = colliderTypes.box2D
  private colliders: Record<symbol, ColliderInterface & Node2D> = {}


  setColliders(colliders: ReadonlyArray<Collider2D>) {
    for (const collider of colliders) {
      this.colliders[collider.id] = collider
    }
  }
}


export interface CollisionShape2DConfig extends Collider2DConfig { }

export class CollisionShape2D extends Collider2D {
  constructor(config: CollisionShape2DConfig) {
    super(config)
  }

  // setColliders()

  // isColliding(c: ) {
  //   return true
  // }


}