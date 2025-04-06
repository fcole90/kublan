import { Renderer } from "@kublan/engine/src/render/Renderer"
import { Settings } from "@kublan/engine/src/config/settings"
import { Node2D } from "@kublan/engine/src/nodes/Node2D"

export interface CoreConfig {
  ctx: CanvasRenderingContext2D,
  settings: Settings,
  rootScene: Node2D,
}

export class Core {
  private renderer: Renderer
  private shouldStop: boolean = true
  // private ctx: CanvasRenderingContext2D
  private root: Node2D

  constructor(config: CoreConfig) {
    this.renderer = new Renderer(config.ctx, config.settings)
    this.root = config.rootScene
    // this.ctx = config.ctx
  }

  start() {
    console.log('Core start')
    this.shouldStop = false
    // this.root._ready()
    this.loop(window.performance.now())
  }

  private loopSteps(eps: number) {
    // this.root._input([]) // TODO: input handling
    this.root.process(eps)
    // this.root._physicsProcess(eps)
    this.root.draw(this.renderer)
    console.log(eps)
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
