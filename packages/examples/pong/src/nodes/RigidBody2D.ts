import { Vector2 } from "../primitives/Vector2";
import { PhysicsBody2D, PhysicsBody2DConfig } from "./PhysicsBody2D";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RigidBody2DConfig extends PhysicsBody2DConfig { }

export class RigidBody2D extends PhysicsBody2D {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: RigidBody2DConfig) {
    super(config)
  }

  _physicsProcess(delta: number) {
    const collidedColliders = this.getCollidedColliders()
    const collisionCenters = collidedColliders.map((c) => c.getCenter())

    const averageInitializer = { x: 0, y: 0 }
    for (const collisionCenter of collisionCenters) {
      averageInitializer.x += collisionCenter.x
      averageInitializer.y += collisionCenter.y
    }

    const collisionDirection = new Vector2(averageInitializer).norm()
    const speed = this.velocity.magnitude()
    const updatedDirection = new Vector2([-collisionDirection.x, -collisionDirection.y]).mul(speed * delta)
    this.setPosition(this.getPosition().add(updatedDirection))
  }
}