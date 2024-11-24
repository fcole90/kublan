import { Node2D, Node2DConfig } from "../../nodes/Node2D";
import { Shape2D, shape2Dtypes } from "../../nodes/Shape2D";
import { Vector2D } from "../../primitives/Vector2D";
import { Renderer } from "../../render/Renderer";


interface PlayerNodeConfig extends Node2DConfig {
  isUserControlled?: boolean
}

export class Player extends Node2D {
  private config: PlayerNodeConfig
  private pressedKeys: Set<string> = new Set([])

  private playerSpeed: number = 0.15
  private readonly shape: Shape2D


  constructor(config: PlayerNodeConfig) {
    super({
      position: new Vector2D(config.position),
    })
    this.config = config

    this.playerSpeed = 0.15
    this.shape = new Shape2D({
      position: [0, 0],
      size: [20, 80],
      shapeType: shape2Dtypes.rectangle
    })
    this.addChildNode(this.shape)
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



  start() {
    if (this.config.isUserControlled) {
      this.setupInputHandling()
    }
  }

  getInputVector() {
    const direction = new Vector2D([0, 0])
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

  update(eps: number) {
    const direction = this.getInputVector()
    if (!direction.isNull()) {
      const normDir = direction.norm()
      const translation = new Vector2D([normDir.x * this.playerSpeed * eps, normDir.y * this.playerSpeed * eps])
      this.setPosition(this.getPosition().add(translation))
    }
  }

  render(renderer: Renderer): void {
    console.log('Render from Player')
  }
}