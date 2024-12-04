import { Collider2DConfig, Collider2D } from "./Collider2D";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollisionShape2DConfig extends Collider2DConfig {

}

export class CollisionShape2D extends Collider2D {
  constructor(config: CollisionShape2DConfig) {
    super(config)
    this.colliderType = config.colliderType
  }
}