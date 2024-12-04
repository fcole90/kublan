import { settings } from "./gameSettings"
import { Paddle } from "./scenes/main/Paddle"
import { Renderer } from "./render/Renderer"
import { Area2D } from "./nodes/Area2D"
import { Ball } from "./scenes/main/Ball"

export class Pong {
  private renderer: Renderer
  private shouldStop: boolean = true
  private root: Area2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.renderer = new Renderer(ctx, settings)
    this.root = new Area2D()
  }

  start() {
    this.shouldStop = false

    const mainPlayer = new Paddle({ position: [10, 20], isUserControlled: true })
    const otherPlayer = new Paddle({ position: [settings.viewportSize.width - 50, settings.viewportSize.height / 2] })
    const ball = new Ball({ position: [settings.viewportSize.width / 2 - 20, settings.viewportSize.height / 2 - 20] })

    this.root.addChildNode(mainPlayer)
    this.root.addChildNode(otherPlayer)
    this.root.addChildNode(ball)

    this.root.start()

    this.loop(Date.now())
  }

  private update(eps: number) {
    this.root.update(eps)
  }

  render(_eps: number) {
    // console.debug(Date.now(), 'EPS:', eps, "FPS:", 1000 / eps)
    this.renderer.clear()
    this.root.render(this.renderer)
  }

  stop() {
    this.shouldStop = true
  }

  private loop(lastFrameMs: number) {
    if (!this.shouldStop) {
      window.requestAnimationFrame((timestamp) => {
        const eps = timestamp - lastFrameMs;
        this.update(eps)
        this.render(eps)
        this.loop(timestamp)
      })
    }
  }
}