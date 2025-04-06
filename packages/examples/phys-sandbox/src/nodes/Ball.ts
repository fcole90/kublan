import { Node2D, Node2DConfig } from "@kublan/engine/src/nodes/Node2D";
import { Vector2, Vector2Initializer } from "@kublan/engine/src/primitives/Vector2";
import { Renderer } from "@kublan/engine/src/render/Renderer";
import { settings } from "../config/settings";

export interface BallConfig extends Omit<Node2DConfig, 'position'> {
  center: Vector2Initializer
  radius: number
  color: string
}

export class Ball extends Node2D {
  private radius: number;
  private color: string;

  constructor(config: BallConfig) {
    const center = new Vector2(config.center);
    super({
      ...config,
      position: center.sub(new Vector2([config.radius, config.radius]))
    });
    this.radius = config.radius;
    this.color = config.color;
  }

  public getCenter(): Readonly<Vector2> {
    return this.getPosition().add(new Vector2([this.radius, this.radius]))
  }

  protected _process(delta: number): void {
    const speed = 0.2
    const updatedPosition = this.getPosition().add(new Vector2([0, delta * speed]))

    if (updatedPosition.y + (this.radius * 2) >= settings.viewportSize.y) {
      updatedPosition.y = settings.viewportSize.y - this.radius * 2
    }

    this.setPosition(updatedPosition)
  }

  protected _draw(renderer: Renderer): void {
    renderer.drawCircle(this.getCenter(), this.radius, this.color);
  }
}
