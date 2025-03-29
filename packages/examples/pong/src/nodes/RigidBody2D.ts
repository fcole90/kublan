import {
  CollisionData2D,
  getCollisionData,
} from "../phys/collisions/collisionData";
import {
  Vector2,
  Vector2Initializer,
} from "@kublan/engine/src/primitives/Vector2";
import { PhysicsBody2D, PhysicsBody2DConfig } from "./PhysicsBody2D";

export interface RigidBody2DConfig extends PhysicsBody2DConfig {
  initialVelocity?: Vector2Initializer;
}

export class RigidBody2D extends PhysicsBody2D {
  constructor(config: RigidBody2DConfig) {
    super(config);
    this.velocity = new Vector2(config.initialVelocity);
  }

  /** Simplified from https://stackoverflow.com/a/573206 */
  getBounceVelocity({ normal }: CollisionData2D) {
    // Bounce decomposition
    const perpendicularComponent = normal.mul(
      this.velocity.dot(normal) / normal.dot(normal)
    );
    const parallelComponent = this.velocity.sub(perpendicularComponent);

    // Approximate frictionless full-elastic bounce
    return parallelComponent.sub(perpendicularComponent);
  }

  handleCollisions() {
    const collisionPairs = this.getCollisionPairs({ onlyNew: true });
    for (const [ownCollider, outCollider] of collisionPairs) {
      const collisionData = getCollisionData(ownCollider, outCollider);
      this.velocity = this.getBounceVelocity(collisionData);
    }
  }

  _physicsProcess(delta: number) {
    this.handleCollisions();
    this.setPosition(this.getPosition().add(this.velocity.mul(delta)));
  }
}
