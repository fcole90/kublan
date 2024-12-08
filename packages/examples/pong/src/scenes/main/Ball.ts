import { settings } from "../../gameSettings";
import { CollisionShape2D } from "../../nodes/CollisionShape2D";
import { PhysicsBody2D, PhysicsBody2DConfig } from "../../nodes/PhysicsBody2D";
import { Shape2D, shape2Dtypes } from "../../nodes/Shape2D";
import { colliderTypes } from "../../phys/ColliderInterface";
import { Vector2 } from "../../primitives/Vector2";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BallNodeConfig extends PhysicsBody2DConfig { }

export class Ball extends PhysicsBody2D {
  private config: BallNodeConfig

  private speed: number = 0.15
  private direction: Vector2
  private readonly shape: Shape2D
  private readonly collisionShape: CollisionShape2D


  constructor(config: BallNodeConfig) {
    super({
      position: new Vector2(config.position),
    })
    this.config = config

    const radiantDirectionAngle = Math.random() * 2 * Math.PI
    const directionInitializer = [
      Math.cos(radiantDirectionAngle),
      Math.sin(radiantDirectionAngle)
    ] as const

    this.direction = new Vector2(directionInitializer)

    const position = [0, 0] as const
    const size = [20, 20] as const

    this.shape = new Shape2D({
      position,
      size,
      shapeType: shape2Dtypes.circle
    })
    this.addChild(this.shape)
    this.collisionShape = new CollisionShape2D({
      id: 'ball',
      colliderType: colliderTypes.circle,
      position,
      size,
    })
    this.addChild(this.collisionShape)
  }

  _ready() {

  }

  _physicsProcess(delta: number) {
    // Handle out of screen
    const collisionBox = this.collisionShape.getBoundingBox()
    if (collisionBox.x < 0 || collisionBox.x + collisionBox.w > settings.viewportSize.x) {
      this.direction = new Vector2([-this.direction.x, this.direction.y])
    }
    if (collisionBox.y < 0 || collisionBox.y + collisionBox.h > settings.viewportSize.y) {
      this.direction = new Vector2([this.direction.x, -this.direction.y])
    }

    const movement = this.direction.norm().mul(this.speed * delta)
    this.setPosition(this.getPosition().add(movement))
    const normDir = this.direction.norm()
    const translation = new Vector2([normDir.x * this.speed * delta, normDir.y * this.speed * delta])
    this.setPosition(this.getPosition().add(translation))
  }
}