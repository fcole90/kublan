import { CollisionShape2D } from "../../nodes/CollisionShape2D";
import { Node2D, Node2DConfig } from "../../nodes/Node2D";
import { Shape2D, shape2Dtypes } from "../../nodes/Shape2D";
import { colliderTypes } from "../../phys/ColliderInterface";
import { Vector2 } from "../../primitives/Vector2";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BallNodeConfig extends Node2DConfig { }

export class Ball extends Node2D {
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
    this.addChildNode(this.shape)
    this.collisionShape = new CollisionShape2D({
      id: 'ball',
      colliderType: colliderTypes.circle,
      position,
      size,
    })
    this.addChildNode(this.collisionShape)
  }




  start() {

  }



  update(eps: number) {
    const movement = this.direction.norm().mul(this.speed * eps)
    this.setPosition(this.getPosition().add(movement))
    const normDir = this.direction.norm()
    const translation = new Vector2([normDir.x * this.speed * eps, normDir.y * this.speed * eps])
    this.setPosition(this.getPosition().add(translation))
  }
}