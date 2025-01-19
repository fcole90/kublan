import { Collider2D } from "../nodes/Collider2D"
import { Vector2 } from "../primitives/Vector2"
import { Collider2DInterface, colliderTypes } from "./ColliderInterface"

export interface CollisionData2D {
  depthDirection: Vector2
  normal: Vector2
}

export const getCollisionData = (from: Collider2D, to: Collider2D): CollisionData2D => {
  if (from.colliderType === colliderTypes.circle && to.colliderType === colliderTypes.rect) {
    return getCircleToRectCollisionData(from, to)
  }

  throw new Error(`Cannot handle collision data from ${from.colliderType} to ${to.colliderType}.`)

}

const getCircleToRectCollisionData = (circleCollider: Collider2DInterface, rectCollider: Collider2DInterface,): CollisionData2D => {
  const rectangle = rectCollider.getBoundingBox()
  const circleBox = circleCollider.getBoundingBox()
  const circleCenter = circleBox.getCenter()
  const circleRadius = circleBox.w / 2
  const surfacePoint = rectangle.getClosestPointOnPerimeter(circleCenter)
  const collisionSurfaceNormal = rectangle.getNormalAt(surfacePoint)

  // The position of the innermost point of the circle inside the rectangle
  const innerPoint = circleCenter.add(collisionSurfaceNormal.mul(circleRadius))
  const depthDirection = collisionSurfaceNormal.mul(Vector2.getDistance(innerPoint, surfacePoint))

  return {
    depthDirection,
    normal: collisionSurfaceNormal
  }

}