import { BaseNode, BaseNodeConfig } from "../../nodes/BaseNode";
import { RectangleNode, RectangleNodeConfig } from "../../nodes/RectangleNode";
import { Vector2D, Vector2DInitializer } from "../../primitives/Vector2D";

const size = new Vector2D([20, 80])

interface PlayerNodeConfig extends BaseNodeConfig {

}

export class PlayerNode extends RectangleNode {
  private playerSpeed: number = 0.15
  private pressedKeys: Set<string> = new Set([])

  constructor(config: PlayerNodeConfig) {
    super({
      initialPosition: new Vector2D(config.initialPosition),
      size: new Vector2D(size)
    })
  }

  start() {
    console.log('Player node started')
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

  update(eps: number) {
    const direction = new Vector2D([0, 0])
    if (this.pressedKeys.has('ArrowUp')) {
      direction.y -= this.playerSpeed * eps
    }

    if (this.pressedKeys.has('ArrowDown')) {
      direction.y += this.playerSpeed * eps
    }

    if (this.pressedKeys.has('ArrowLeft')) {
      direction.x -= this.playerSpeed * eps
    }

    if (this.pressedKeys.has('ArrowRight')) {
      direction.x += this.playerSpeed * eps
    }

    if (!direction.isNull()) {
      this.setPosition(this.getPosition().add(direction.norm()))
    }
  }
}