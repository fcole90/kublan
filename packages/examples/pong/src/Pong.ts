import { settings } from "./gameSettings"
import { Paddle } from "./scenes/main/Paddle"
import { Renderer } from "./render/Renderer"
import { Scene2D } from "./nodes/Scene2D"
import { Ball } from "./scenes/main/Ball"
import { Shape2D, shape2Dtypes } from "./nodes/Shape2D"

export class Pong {
  private renderer: Renderer
  private shouldStop: boolean = true
  private root: Scene2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.renderer = new Renderer(ctx, settings)
    this.root = new Scene2D()
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

    this.root.addChild(field)
    field.addChild(mainPlayer)
    field.addChild(otherPlayer)
    field.addChild(ball)

    this.root._ready()
    this.loop(window.performance.now())
  }

  private loopSteps(eps: number) {
    this.root._input([]) // TODO: input handling
    this.root._process(eps)
    this.root._physicsProcess(eps)
    this.root._draw(this.renderer)
  }

  stop() {
    this.shouldStop = true
  }

  private loop(lastFrameMs: number) {
    if (!this.shouldStop) {
      window.requestAnimationFrame((timestamp) => {
        const eps = timestamp - lastFrameMs;
        this.loopSteps(eps)
        this.loop(timestamp)
      })
    }
  }
}