import { Node2D, Node2DConfig } from "./Node2D";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PhysicsBody2DConfig extends Node2DConfig { }

export class PhysicsBody2D extends Node2D {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: PhysicsBody2DConfig) {
    super(config)
  }

  _physicsProcess(_delta: number) { }
}