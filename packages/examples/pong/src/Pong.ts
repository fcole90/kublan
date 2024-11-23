import { settings } from "./gameSettings"
import { Player } from "./scenes/main/Player"
import { Vector2D } from "./primitives/Vector2D"
import { Renderer } from "./render/Renderer"

export class Pong {
  private renderer: Renderer
  private lastFrameMs: number = Date.now()
  private shouldStop: boolean = true
  private pressedKeys: Set<string> = new Set([])
  private player: Player
  private playerSpeed: number = 0.15

  constructor(ctx: CanvasRenderingContext2D) {
    this.renderer = new Renderer(ctx, settings)
    this.player = new Player({ x: 0, y: 0 })
  }

  render(eps: number) {
    console.debug(Date.now(), 'EPS:', eps, "FPS:", 1000 / eps)
    this.renderer.clear()
    this.player.render(this.renderer)
  }

  private loop() {
    if (!this.shouldStop) {
      window.requestAnimationFrame((timestamp) => {
        const eps = timestamp - this.lastFrameMs;
        this.lastFrameMs = timestamp;
        this.update(eps)
        this.loop()
      })
    }
  }

  private update(eps: number) {
    console.debug('Pressed keys:', this.pressedKeys)
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

    this.player.updatePosition(this.player.rect.getPosition().add(translate))
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