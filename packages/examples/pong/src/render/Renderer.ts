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

  printDebugOverlay(debugText: string, positionInitializer: Vector2Initializer, color: string) {
    const position = new Vector2(positionInitializer)
    const textWidth = this.ctx.measureText(debugText).width
    const minX = 0
    const maxX = this.settings.viewportSize.x - textWidth
    this.ctx.fillStyle = color
    this.ctx.fillText(debugText, Math.max(minX, Math.min(position.x - textWidth / 2, maxX)), position.y - 2)
  }

  drawRectangle(rectInitializer: RectangleInitializer, color: string) {
    const rect = new Rectangle(rectInitializer)
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...rect.toArray())
    this.ctx.fillStyle = 'blue';
    this.printDebugOverlay(`${rect.x.toFixed(2).toString().toString()} - ${rect.y.toFixed(2).toString()}`, [rect.x, rect.y], 'blue')

  }

  drawCircle(centerInitializer: Vector2Initializer, radius: number, color: string) {
    const center = new Vector2(centerInitializer)

    this.ctx.fillStyle = color
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.settings.viewportSize.x, this.settings.viewportSize.y)
  }
}