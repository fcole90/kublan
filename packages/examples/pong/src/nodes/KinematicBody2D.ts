import { PhysicsBody2D, PhysicsBody2DConfig } from "./PhysicsBody2D";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KinematicBody2DConfig extends PhysicsBody2DConfig { }

export class KinematicBody2D extends PhysicsBody2D {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: KinematicBody2DConfig) {
    super(config)
  }

  _physicsProcess(_delta: number) { }
}