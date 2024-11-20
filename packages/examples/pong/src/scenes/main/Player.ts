import { RectangleNode } from "../../nodes/RectangleNode";
import { Vector2D, Vector2DInitializer } from "../../primitives/Vector2D";

const sideSize = 20

export class Player extends RectangleNode {
  constructor(initialPosition: Vector2DInitializer) {
    const positonVector = new Vector2D(initialPosition)

    super([positonVector.x, positonVector.y, sideSize, sideSize])
  }
}