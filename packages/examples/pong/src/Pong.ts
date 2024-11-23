import { settings } from "./gameSettings"
import { PlayerNode } from "./scenes/main/PlayerNode"
import { Renderer } from "./render/Renderer"
import { RootNode } from "./nodes/RootNode"

export class Pong {
  private renderer: Renderer
  private shouldStop: boolean = true
  private root: RootNode

  constructor(ctx: CanvasRenderingContext2D) {
    this.renderer = new Renderer(ctx, settings)
    this.root = new RootNode()
  }

  start() {
    this.shouldStop = false

    this.root.addChildNode(new PlayerNode({ initialPosition: [10, 20], isUserControlled: true }))
    this.root.addChildNode(new PlayerNode({ initialPosition: [settings.viewportSize.width - 50, settings.viewportSize.height / 2] }))
    this.root.start()

    this.loop(Date.now())
  }

  private update(eps: number) {
    this.root.update(eps)
  }

  render(eps: number) {
    console.debug(Date.now(), 'EPS:', eps, "FPS:", 1000 / eps)
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