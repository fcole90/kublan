import { Rectangle } from "../../primitives/Rectangle";
import { Vector2, Vector2Array } from "../../primitives/Vector2";
import {
  Collider2DInterface,
  colliderTypes,
} from "./colliders/ColliderInterface";

export const detectCollisions = (
  colliders: Collider2DInterface[]
): Record<symbol, Record<symbol, boolean>> => {
  const collisionsMap: Record<
    symbol,
    Record<symbol, boolean | undefined> | undefined
  > = {};

  for (const colliderA of colliders) {
    for (const colliderB of colliders) {
      const hasAlreadyBeenChecked =
        collisionsMap[colliderA.id]?.[colliderB.id] != undefined;
      if (hasAlreadyBeenChecked) {
        continue;
      }

      const isCollision =
        collisionsMap[colliderA.id]?.[colliderB.id] ??
        areColliding(colliderA, colliderB);
      if (isCollision) {
        console.log("Detected collision:", {
          [colliderA.id.description ?? "unknownA"]: colliderA
            .getBoundingBox()
            .toArray(),
          [colliderB.id.description ?? "unknownB"]: colliderB
            .getBoundingBox()
            .toArray(),
        });
      }

      collisionsMap[colliderA.id] = {
        ...collisionsMap[colliderA.id],
        ...{ [colliderB.id]: isCollision },
      };
      collisionsMap[colliderB.id] = {
        ...collisionsMap[colliderB.id],
        ...{ [colliderA.id]: isCollision },
      };
    }
  }

  return collisionsMap as Record<symbol, Record<symbol, boolean>>;
};

export const areColliding = (
  colliderA: Collider2DInterface,
  colliderB: Collider2DInterface
): boolean => {
  if (colliderA.id === colliderB.id) {
    // A collider cannot collide with itself
    return false;
  }

  if (
    colliderA.colliderType === colliderTypes.circle &&
    colliderB.colliderType === colliderTypes.circle
  ) {
    return areCirclesColliding(colliderA, colliderB);
  }

  if (
    colliderA.colliderType === colliderTypes.rect &&
    colliderB.colliderType === colliderTypes.rect
  ) {
    return areRectsColliding(colliderA, colliderB);
  }

  if (
    colliderA.colliderType === colliderTypes.rect &&
    colliderB.colliderType === colliderTypes.circle
  ) {
    return areRectCircleColliding(colliderA, colliderB);
  }

  if (
    colliderA.colliderType === colliderTypes.circle &&
    colliderB.colliderType === colliderTypes.rect
  ) {
    return areRectCircleColliding(colliderB, colliderA);
  }

  throw new Error(
    "Collision between " +
      colliderA.colliderType +
      " and " +
      colliderB.colliderType +
      " not supported"
  );
};

const areRectsColliding = (
  colliderA: Collider2DInterface,
  colliderB: Collider2DInterface
): boolean => {
  const rectA = colliderA.getBoundingBox();
  const rectB = colliderB.getBoundingBox();

  if (
    rectA.x < rectB.x + rectB.w &&
    rectA.x + rectA.w > rectB.x &&
    rectA.y < rectB.y + rectB.h &&
    rectA.y + rectA.h > rectB.y
  ) {
    return true;
  }

  return false;
};

const areCirclesColliding = (
  colliderA: Collider2DInterface,
  colliderB: Collider2DInterface
): boolean => {
  const circleABox = colliderA.getBoundingBox();
  const circleBBox = colliderB.getBoundingBox();

  const centerA = circleABox.getCenter();
  const centerB = circleBBox.getCenter();
  const radiusA = circleABox.w / 2;
  const radiusB = circleBBox.w / 2;

  const collisionDistanceSquared = Math.pow(radiusA + radiusB, 2);
  const centerDistanceSquared =
    Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2);

  return centerDistanceSquared < collisionDistanceSquared;
};

const areRectCircleColliding = (
  rectCollider: Collider2DInterface,
  circleCollider: Collider2DInterface
): boolean => {
  // Broad phase - bounding box collision
  const isBoxCollision = areRectsColliding(rectCollider, circleCollider);
  if (!isBoxCollision) {
    return false;
  }

  // We now apply the radius to the rectangle and check if the center falls on its area
  /**
   *     - - *- - - - *- - ,
   *   /     :        :  /r \
   *  :      :        : /    :
   *  *- - - *--------*- - - *
   *  :      |        |      :
   *  :      |        |      :
   *  :   r  |   w    |   r  :
   *  :------|--------|------:
   *  :      |        |      :
   *  :      |        |      :                _
   *  :      |        |      :             -     -
   *  :      |        |      :           /      r  \
   *  *- - - *--------*- - - *          |   C .-----|
   *  :      :        :  C   :           \         /
   *   \     :        :  . <-/-----------  -  _  -
   *     - -  *- - - - *- -
   *
   */

  // Narrow phase - sides plus radius
  const rect = rectCollider.getBoundingBox();
  const circleBox = circleCollider.getBoundingBox();
  const center = circleBox.getCenter();
  const radius = circleBox.w / 2;

  /**
   *
   *(x-r, y)(x, y)(x+w, y)(x+w+r, y)
   *  *- - - *--------*- - - *
   *  :      |        |      :
   *  :      |        |      :
   *  :   r  |   w    |   r  :
   *  :------|--------|------:
   *  :      |        |      :
   *  :      |        |      :                _
   *  :      |        |      :             -     -
   *  :      |        |      :           /      r  \
   *  *- - - *--------*- - - *          |   C .-----|
   *                                     \         /
   *     Horizontal example                -  _  -
   *
   */
  const horizontalBox = new Rectangle([
    rect.x - radius,
    rect.y,
    rect.w + 2 * radius,
    rect.h,
  ]);
  if (isPointInRect(center, horizontalBox)) {
    return true;
  }

  const verticalBox = new Rectangle([
    rect.x,
    rect.y - radius,
    rect.w,
    rect.h + 2 * radius,
  ]);
  if (isPointInRect(center, verticalBox)) {
    return true;
  }

  // Narrow phase - corners
  const rectVertices: [Vector2Array, Vector2Array, Vector2Array, Vector2Array] =
    [
      [rect.x, rect.y],
      [rect.x + rect.w, rect.y],
      [rect.x, rect.y + rect.h],
      [rect.x + rect.w, rect.y + rect.h],
    ];

  const radiusSquared = Math.pow(radius, 2);
  for (const vertex of rectVertices) {
    const centerToCornerDistanceSquared =
      Math.pow(vertex[0] - center.x, 2) + Math.pow(vertex[1] - center.y, 2);
    if (centerToCornerDistanceSquared < radiusSquared) {
      return true;
    }
  }

  return false;
};

const isPointInRect = (point: Vector2, rect: Rectangle) => {
  /**
   *   *--------*
   *   |        |
   *   |        |
   *   |        |
   *   |        |
   *   |     P  |
   *   |     .  |
   *   |        |
   *   *--------*
   */

  if (
    point.x < rect.x + rect.w &&
    point.x > rect.x &&
    point.y < rect.y + rect.h &&
    point.y > rect.y
  ) {
    return true;
  }

  return false;
};
