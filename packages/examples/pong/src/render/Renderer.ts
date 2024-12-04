import type { GameSettings } from "../gameSettings";
import { Rectangle, RectangleInitializer } from "../primitives/Rectangle"
import { Vector2, Vector2Initializer } from "../primitives/Vector2";

export class Renderer {
  readonly ctx: CanvasRenderingContext2D
  readonly settings: GameSettings

  constructor(ctx: CanvasRenderingContext2D, settings: GameSettings) {
    this.ctx = ctx
    this.settings = settings
  }

  drawRectangle(rectInitializer: RectangleInitializer, color: string) {
    const rect = new Rectangle(rectInitializer)
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...rect.toArray())
  }

  drawCircle(centerInitializer: Vector2Initializer, radius: number, color: string) {
    const center = new Vector2(centerInitializer)
    console.log('center:', center.toArray(), 'radius:', radius)

    this.ctx.fillStyle = color
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.settings.viewportSize.width, this.settings.viewportSize.width)
  }
}