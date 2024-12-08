import { settings } from "./gameSettings"
import { Paddle } from "./scenes/main/Paddle"
import { Renderer } from "./render/Renderer"
import { Area2D } from "./nodes/Area2D"
import { Ball } from "./scenes/main/Ball"
import { Shape2D, shape2Dtypes } from "./nodes/Shape2D"

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

    const field = new Shape2D({
      position: [0, 0],
      size: settings.viewportSize,
      shapeType: shape2Dtypes.rectangle,
      color: 'green'
    })
    const mainPlayer = new Paddle({
      position: [0, settings.viewportSize.y / 2 - 40],
      isUserControlled: true
    })
    const otherPlayer = new Paddle({
      position: [settings.viewportSize.x - 10, settings.viewportSize.y / 2 - 40]
    })
    const ball = new Ball({
      position: [settings.viewportSize.x / 2 - 20, settings.viewportSize.x / 2 - 20]
    })

    this.root.addChildNode(field)
    field.addChildNode(mainPlayer)
    field.addChildNode(otherPlayer)
    field.addChildNode(ball)

    this.root.start()
    this.loop(window.performance.now())
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