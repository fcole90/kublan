import type { Node2D } from "../nodes/Node2D"
import { Vector2D } from "../primitives/Vector2D"

export const colliderTypes = {
  box2D: 'box2D'
} as const

export type ColliderType = keyof typeof colliderTypes

export interface ColliderInterface {
  colliderType: ColliderType
  getSize: () => Vector2D
  getAbsolutePosition: () => Vector2D
}