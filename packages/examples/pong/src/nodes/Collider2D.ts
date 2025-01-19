import { ColliderType, Collider2DInterface, colliderTypes } from "../phys/ColliderInterface";
import { Rectangle } from "../primitives/Rectangle";
import { Vector2 } from "../primitives/Vector2";
import { Node2D, Node2DConfig } from "./Node2D";


export interface Collider2DConfig extends Node2DConfig {
  colliderType: ColliderType,
}

export type Collider2DMap = Record<symbol, Collider2D>;

export abstract class Collider2D extends Node2D implements Collider2DInterface {
  colliderType: ColliderType = colliderTypes.rect
  private collidedColliders: ReadonlyArray<Collider2D> = []
  private prevCollidedCollidersId: Set<symbol> = new Set([])

  setCollidedColliders(colliders: ReadonlyArray<Collider2D>) {
    this.prevCollidedCollidersId = new Set(this.collidedColliders.map((c) => c.id))
    this.collidedColliders = colliders
  }

  getCollidedColliders(options?: { onlyNew?: true }) {
    if (options?.onlyNew === true) {
      return this.collidedColliders.reduce<Array<Collider2D>>((newCollidersList, collider) => {
        if (this.prevCollidedCollidersId.has(collider.id)) {
          return newCollidersList
        }

        return [...newCollidersList, collider]
      }, [])
    }

    return this.collidedColliders
  }

  getCollisionPairs(options?: { onlyNew?: true }) {

    return this.getCollidedColliders(options).map((c) => [this, c] as [Collider2D, Collider2D])
  }

  getBoundingBox() {
    const position = this._getAbsolutePosition()
    const size = this.getSize()
    return new Rectangle([
      position.x,
      position.y,
      size.x,
      size.y,
    ])
  }

  getCenter() {
    const position = this._getAbsolutePosition()
    const size = this.getSize()
    return new Vector2([
      position.x + size.x / 2,
      position.y + size.y / 2,
    ])
  }
}
