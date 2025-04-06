import { settings } from '../../gameSettings';
import { CollisionShape2D } from '../../nodes/CollisionShape2D';
import { RigidBody2D, RigidBody2DConfig } from '../../nodes/RigidBody2D';
import { Shape2D, shape2Dtypes } from '../../nodes/Shape2D';
import { colliderTypes } from '../../phys/collisions/colliders';
import { Vector2 } from '@kublan/engine/src/primitives/Vector2';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BallNodeConfig extends RigidBody2DConfig {}

export class Ball extends RigidBody2D {
  private readonly shape: Shape2D;
  private readonly collisionShape: CollisionShape2D;

  constructor(config: BallNodeConfig) {
    const speed: number = 0.1;
    const size: number = 20;
    const radiantDirectionAngle = Math.random() * 2 * Math.PI;
    const directionInitializer = [
      Math.cos(radiantDirectionAngle),
      Math.sin(radiantDirectionAngle),
    ] as const;
    const direction = Vector2.from(directionInitializer).normalized();

    super({
      ...config,
      position: Vector2.from(config.position),
      initialVelocity: direction.mul(speed),
    });

    this.shape = new Shape2D({
      size: [size, size],
      shapeType: shape2Dtypes.circle,
    });
    this.addChild(this.shape);
    this.collisionShape = new CollisionShape2D({
      id: 'ball',
      colliderType: colliderTypes.circle,
      size: [size, size],
    });
    this.addChild(this.collisionShape);
  }

  _ready() {}

  _process(delta: number) {
    // Handle out of screen
    const collisionBox = this.collisionShape.getBoundingBox();
    if (
      // collisionBox.x < 0 ||
      collisionBox.x + collisionBox.w >
      settings.viewportSize.x
    ) {
      this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    }
    if (
      collisionBox.y < 0 ||
      collisionBox.y + collisionBox.h > settings.viewportSize.y
    ) {
      this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    }

    // Continue normal phys
    super._process(delta);
  }
}
