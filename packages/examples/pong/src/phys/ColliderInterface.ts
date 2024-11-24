import { Rectangle } from "../primitives/Rectangle"
import { Vector2 } from "../primitives/Vector2"

export const colliderTypes = {
  box2D: 'box2D'
} as const

export type ColliderType = keyof typeof colliderTypes

export interface ColliderInterface {
  id: symbol
  colliderType: ColliderType
  getSize: () => Vector2
  getBoundingBox: () => Rectangle
}