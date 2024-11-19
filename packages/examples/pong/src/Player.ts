import { Vector2D, Vector2DInitializer } from "./Vector2D";

export class Player {
  position: Vector2D

  constructor(position: Vector2DInitializer) {
    this.position = new Vector2D(position)
  }
}