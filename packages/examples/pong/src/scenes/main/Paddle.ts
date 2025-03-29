import { CollisionShape2D } from "../../nodes/CollisionShape2D";
import {
  KinematicBody2D,
  KinematicBody2DConfig,
} from "../../nodes/KinematicBody2D";
import { Shape2D, shape2Dtypes } from "../../nodes/Shape2D";
import { colliderTypes } from "../../phys/collisions/colliders/ColliderInterface";
import { Vector2 } from "@kublan/engine/src/primitives/Vector2";

interface PaddleNodeConfig extends KinematicBody2DConfig {
  isUserControlled?: boolean;
}

export class Paddle extends KinematicBody2D {
  private config: PaddleNodeConfig;
  private pressedKeys: Set<string> = new Set([]);

  private speed: number = 0.15;
  private readonly shape: Shape2D;
  private readonly collisionShape: CollisionShape2D;

  constructor(config: PaddleNodeConfig) {
    super({
      position: new Vector2(config.position),
    });
    this.config = config;

    this.speed = 0.35;

    const position = [0, 0] as const;
    const size = [10, 80] as const;

    this.shape = new Shape2D({
      position,
      size,
      shapeType: shape2Dtypes.rectangle,
    });
    this.addChild(this.shape);
    this.collisionShape = new CollisionShape2D({
      id: this.config.isUserControlled ? "player" : "enemy",
      colliderType: colliderTypes.rect,
      position,
      size,
    });
    this.addChild(this.collisionShape);
  }

  setupInputHandling() {
    console.log("setupInputHandling");
    document.addEventListener("keydown", (event) => {
      console.log("Keydown", event);
      this.pressedKeys.add(event.key);
    });

    document.addEventListener("keyup", (event) => {
      this.pressedKeys.delete(event.key);
    });
  }

  _ready() {
    if (this.config.isUserControlled) {
      this.setupInputHandling();
    }
  }

  getInputVector() {
    const direction = new Vector2([0, 0]);
    if (this.pressedKeys.has("w")) {
      direction.y -= 1;
    }

    if (this.pressedKeys.has("s")) {
      direction.y += 1;
    }

    if (this.pressedKeys.has("ArrowUp")) {
      direction.y -= 1;
    }

    if (this.pressedKeys.has("ArrowDown")) {
      direction.y += 1;
    }
    if (direction.toArray().includes(NaN)) {
      throw new Error("Direction is NAN");
    }
    return direction.norm();
  }

  _physicsProcess(delta: number) {
    // console.log(this.pressedKeys)
    const direction = this.getInputVector();
    // console.log('Input:', direction)
    if (!direction.isNull()) {
      // console.log('Input:', direction)
      console.log("Input:", direction);
      const normDir = direction.norm();
      const translation = new Vector2([
        normDir.x * this.speed * delta,
        normDir.y * this.speed * delta,
      ]);
      this.setPosition(this.getPosition().add(translation));
      console.log({
        eps: delta,
        speed: this.speed,
        position: this.getPosition().toArray(),
        translation: translation.toArray(),
      });
    }
  }
}
