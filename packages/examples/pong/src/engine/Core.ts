import { settings } from "../gameSettings"
import { Renderer } from "../render/Renderer"
import { Scene2D } from "../nodes/Scene2D"

export interface CoreConfig {
  ctx: CanvasRenderingContext2D,
  rootScene: Scene2D,
}

export class Core {
  private renderer: Renderer
  private shouldStop: boolean = true
  private root: Scene2D

  constructor(config: CoreConfig) {
    this.renderer = new Renderer(config.ctx, settings)
    this.root = config.rootScene
  }

  start() {
    this.shouldStop = false
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