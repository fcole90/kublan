import { Collider2D as ColliderNode2D } from '../../nodes/Collider2D';
import { Vector2 } from '@kublan/engine/src/primitives/Vector2';
import { CircleCollider2D, colliderTypes, RectCollider2D } from './colliders';

export interface CollisionData2D {
  depthDirection: Vector2;
  normal: Vector2;
}

export const getCollisionData = (
  from: ColliderNode2D,
  to: ColliderNode2D,
): CollisionData2D => {
  if (
    from.colliderType === colliderTypes.circle &&
    to.colliderType === colliderTypes.circle
  ) {
    return getCircleToCircleCollisionData(
      from as CircleCollider2D,
      to as CircleCollider2D,
    );
  }

  if (
    from.colliderType === colliderTypes.circle &&
    to.colliderType === colliderTypes.rect
  ) {
    return getCircleToRectCollisionData(
      from as CircleCollider2D,
      to as RectCollider2D,
    );
  }

  throw new Error(
    `Cannot handle collision data from ${from.colliderType} to ${to.colliderType}.`,
  );
};

const getCircleToCircleCollisionData = (
  circleColliderA: CircleCollider2D,
  circleColliderB: CircleCollider2D,
): CollisionData2D => {
  const circleBoxA = circleColliderA.getBoundingBox();
  const circleCenterA = circleBoxA.getCenter();
  const circleRadiusA = circleBoxA.w / 2;

  const circleBoxB = circleColliderB.getBoundingBox();
  const circleCenterB = circleBoxB.getCenter();

  const collisionSurfaceNormal = new Vector2(
    circleCenterB.x - circleCenterA.x,
    circleCenterB.y - circleCenterA.y,
  ).normalized();

  const depthDirection = collisionSurfaceNormal.mul(circleRadiusA);

  return {
    depthDirection,
    normal: collisionSurfaceNormal,
  };
};

const getCircleToRectCollisionData = (
  circleCollider: CircleCollider2D,
  rectCollider: RectCollider2D,
): CollisionData2D => {
  const rectangle = rectCollider.getBoundingBox();
  const circleBox = circleCollider.getBoundingBox();
  const circleCenter = circleBox.getCenter();
  const circleRadius = circleBox.w / 2;
  const surfacePoint = rectangle.getClosestPointOnPerimeter(circleCenter);
  const collisionSurfaceNormal = rectangle.getNormalAt(surfacePoint);

  // The position of the innermost point of the circle inside the rectangle
  const innerPoint = circleCenter.add(collisionSurfaceNormal.mul(circleRadius));
  const depthDirection = collisionSurfaceNormal.mul(
    Vector2.getDistance(innerPoint, surfacePoint),
  );

  return {
    depthDirection,
    normal: collisionSurfaceNormal,
  };
};
