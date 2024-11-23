import { Vector2D } from "../primitives/Vector2D";
import { Renderer } from "../render/Renderer";

export class BaseNode {
  constructor() { }

  render(renderer: Renderer, basePosition?: Vector2D) {
    throw new Error('Not implemented')
  }
}