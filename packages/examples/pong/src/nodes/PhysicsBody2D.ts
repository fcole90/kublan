import {
  Vector2,
  Vector2Initializer,
} from '@kublan/engine/src/primitives/Vector2';
import { Collider2D } from './Collider2D';
import { Node2D, Node2DConfig, treeToArray } from './Node2D';

export interface PhysicsBody2DConfig extends Node2DConfig {
  initialVelocity?: Vector2Initializer;
}

export class PhysicsBody2D extends Node2D {
  colliders: Collider2D[] = [];
  centerOfMass: Vector2;
  velocity: Vector2;

  constructor(config: PhysicsBody2DConfig) {
    super(config);

    const position = super.getPosition();
    const size = super.getSize();
    this.centerOfMass = Vector2.from([
      position.x + size.x / 2,
      position.y + size.y / 2,
    ]);

    this.velocity = Vector2.from(config.initialVelocity);
  }

  private updateColliders() {
    this.colliders = treeToArray(this).filter((n) => n instanceof Collider2D);
  }

  override addChild(childNode: Node2D): void {
    super.addChild(childNode);
    this.updateColliders();
  }

  override removeChild(childNode: Node2D): void {
    super.removeChild(childNode);
    this.updateColliders();
  }

  protected getCollidedColliders(options?: { onlyNew?: true }) {
    return this.colliders.map((c) => c.getCollidedColliders(options)).flat();
  }

  protected getCollisionPairs(options?: { onlyNew?: true }) {
    return this.colliders.map((c) => c.getCollisionPairs(options)).flat();
  }

  _physicsProcess(_delta: number) {}
}
