import { Rectangle } from "../primitives/Rectangle"
import { Vector2 } from "../primitives/Vector2"

export const colliderTypes = {
  rect: 'rect',
  circle: 'circle'
} as const

export type ColliderType = keyof typeof colliderTypes

export interface Collider2DInterface {
  id: symbol
  colliderType: ColliderType
  getSize: () => Vector2
  getBoundingBox: () => Rectangle
}