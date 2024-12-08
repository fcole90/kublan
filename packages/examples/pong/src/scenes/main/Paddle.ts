import { CollisionShape2D } from "../../nodes/CollisionShape2D";
import { PhysicsBody2D, PhysicsBody2DConfig } from "../../nodes/PhysicsBody2D";
import { Shape2D, shape2Dtypes } from "../../nodes/Shape2D";
import { colliderTypes } from "../../phys/ColliderInterface";
import { Vector2 } from "../../primitives/Vector2";


interface PaddleNodeConfig extends PhysicsBody2DConfig {
  isUserControlled?: boolean
}

export class Paddle extends PhysicsBody2D {
  private config: PaddleNodeConfig
  private pressedKeys: Set<string> = new Set([])

  private speed: number = 0.15
  private direction: Vector2 = new Vector2([0, 0])
  private readonly shape: Shape2D
  private readonly collisionShape: CollisionShape2D


  constructor(config: PaddleNodeConfig) {
    super({
      position: new Vector2(config.position),
    })
    this.config = config

    this.speed = 0.15

    const position = [0, 0] as const
    const size = [10, 80] as const

    this.shape = new Shape2D({
      position,
      size,
      shapeType: shape2Dtypes.rectangle
    })
    this.addChild(this.shape)
    this.collisionShape = new CollisionShape2D({
      id: this.config.isUserControlled ? 'player' : 'enemy',
      colliderType: colliderTypes.rect,
      position,
      size,
    })
    this.addChild(this.collisionShape)
  }

  setupInputHandling() {
    document.addEventListener(
      'keydown', (event) => {
        this.pressedKeys.add(event.key)
      }
    )

    document.addEventListener(
      'keyup', (event) => {
        this.pressedKeys.delete(event.key)
      }
    )
  }

  _ready() {
    if (this.config.isUserControlled) {
      this.setupInputHandling()
    }
  }

  getInputVector() {
    const direction = new Vector2([0, 0])
    if (this.pressedKeys.has('ArrowUp')) {
      direction.y -= 1
    }

    if (this.pressedKeys.has('ArrowDown')) {
      direction.y += 1
    }

    if (this.pressedKeys.has('ArrowLeft')) {
      direction.x -= 1
    }

    if (this.pressedKeys.has('ArrowRight')) {
      direction.x += 1
    }
    if (direction.toArray().includes(NaN)) {
      throw new Error('Direction is NAN')
    }
    return direction.norm()
  }

  _physicsProcess(delta: number) {
    const direction = this.getInputVector()
    if (!direction.isNull()) {
      const normDir = direction.norm()
      const translation = new Vector2([normDir.x * this.speed * delta, normDir.y * this.speed * delta])
      this.setPosition(this.getPosition().add(translation))
      console.log({
        eps: delta,
        speed: this.speed,
        position: this.getPosition().toArray(),
        translation: translation.toArray()
      })
    }
  }
}