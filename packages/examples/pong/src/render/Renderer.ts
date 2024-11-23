import type { GameSettings } from "../gameSettings";
import { Rectangle, RectangleInitializer } from "../primitives/Rectangle"

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

  clear() {
    this.ctx.clearRect(0, 0, this.settings.viewportSize.width, this.settings.viewportSize.width)
  }
}