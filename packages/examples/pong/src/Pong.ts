import { settings } from "./gameSettings"
import { Player } from "./Player"
import { Vector2D } from "./Vector2D"

export class Pong {
  readonly ctx: CanvasRenderingContext2D
  private lastFrameMs: number = Date.now()
  private shouldStop: boolean = true
  private pressedKeys: Set<string> = new Set([])
  private player: Player = new Player({ x: 0, y: 0 })
  private playerSpeed: number = 0.15

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  render(eps: number) {
    console.debug(Date.now(), 'EPS:', eps, "FPS:", 1000 / eps)

    const translate = new Vector2D([0, 0])
    if (this.pressedKeys.has('ArrowUp')) {
      translate.y -= this.playerSpeed * eps
    }

    if (this.pressedKeys.has('ArrowDown')) {
      translate.y += this.playerSpeed * eps
    }

    if (this.pressedKeys.has('ArrowLeft')) {
      translate.x -= this.playerSpeed * eps
    }

    if (this.pressedKeys.has('ArrowRight')) {
      translate.x += this.playerSpeed * eps
    }

    this.player.position.x += translate.x
    this.player.position.y += translate.y

    this.ctx.clearRect(0, 0, settings.size.width, settings.size.width)

    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.player.position.x, this.player.position.y, 20, 20)
  }

  private loop() {
    if (!this.shouldStop) {
      window.requestAnimationFrame((timestamp) => {
        this.update(timestamp)
        this.loop()
      })
    }
  }

  private update(timestamp: number) {
    console.debug('Pressed keys:', this.pressedKeys)
    const eps = timestamp - this.lastFrameMs;
    this.lastFrameMs = timestamp;
    this.render(eps)
  }

  start() {
    this.shouldStop = false
    this.loop()

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

    this.player = new Player({ x: 10, y: 20 })
  }

  stop() {
    this.shouldStop = true
  }
}