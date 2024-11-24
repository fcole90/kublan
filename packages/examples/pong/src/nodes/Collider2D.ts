import { ColliderType, ColliderInterface, colliderTypes } from "../phys/ColliderInterface";
import { Rectangle } from "../primitives/Rectangle";
import { Node2DConfig, Node2D } from "./Node2D";


export interface Collider2DConfig extends Node2DConfig {
  colliderType: ColliderType;
}

export type Collider2DMap = Record<symbol, Collider2D>;

export abstract class Collider2D extends Node2D implements ColliderInterface {
  colliderType: ColliderType = colliderTypes.box2D;
  private colliders: Record<symbol, Collider2D | undefined> = {};


  setColliders(colliders: ReadonlyArray<Collider2D>) {
    this.colliders = {}
    for (const collider of colliders) {
      this.colliders[collider.id] = collider;
    }
  }

  isColliding(collider: Readonly<Collider2D>): boolean {
    return this.colliders[collider.id] != null
  }

  getBoundingBox() {
    return new Rectangle([...this.getAbsolutePosition().toArray(), ...this.getSize().toArray()])
  }
}
