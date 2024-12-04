import { ColliderInterface, colliderTypes } from "./ColliderInterface";

export const detectCollisions = (colliders: ColliderInterface[]): Record<symbol, Record<symbol, boolean>> => {
  const collisionsMap: Record<symbol, Record<symbol, boolean | undefined> | undefined> = {}

  for (const colliderA of colliders) {
    for (const colliderB of colliders) {
      const hasAlreadyBeenChecked = collisionsMap[colliderA.id]?.[colliderB.id] != undefined
      if (hasAlreadyBeenChecked) {
        continue
      }

      const isCollision = collisionsMap[colliderA.id]?.[colliderB.id] ?? areColliding(colliderA, colliderB)
      if (isCollision) {
        console.log('Detected collision:', {
          [colliderA.id.description ?? 'unknownA']: colliderA.getBoundingBox().toArray(),
          [colliderB.id.description ?? 'unknownB']: colliderB.getBoundingBox().toArray(),
        }
        )
      }

      collisionsMap[colliderA.id] = { ...collisionsMap[colliderA.id], ...{ [colliderB.id]: isCollision } }
      collisionsMap[colliderB.id] = { ...collisionsMap[colliderB.id], ...{ [colliderA.id]: isCollision } }
    }
  }

  return collisionsMap as Record<symbol, Record<symbol, boolean>>
}

export const areColliding = (colliderA: ColliderInterface, colliderB: ColliderInterface): boolean => {
  if (colliderA.id === colliderB.id) {
    // A collider cannot collide with itself
    return false
  }

  if (colliderA.colliderType === colliderTypes.circle && colliderB.colliderType === colliderTypes.circle) {
    return areCirclesColliding(colliderA, colliderB)
  }


  if (colliderA.colliderType === colliderTypes.rect && colliderB.colliderType === colliderTypes.rect) {
    return areRectsColliding(colliderA, colliderB)
  }

  if (colliderA.colliderType === colliderTypes.circle && colliderB.colliderType === colliderTypes.rect) {
    return areRectsColliding(colliderA, colliderB)
  }

  if (colliderA.colliderType === colliderTypes.rect && colliderB.colliderType === colliderTypes.circle) {
    return areRectsColliding(colliderA, colliderB)
  }

  throw new Error('Collision between ' + colliderA.colliderType + ' and ' + colliderB.colliderType + ' not supported')
}

export const areRectsColliding = (colliderA: ColliderInterface, colliderB: ColliderInterface): boolean => {
  const rectA = colliderA.getBoundingBox()
  const rectB = colliderB.getBoundingBox()

  if (
    rectA.x < rectB.x + rectB.w &&
    rectA.x + rectA.w > rectB.x &&
    rectA.y < rectB.y + rectB.h &&
    rectA.y + rectA.h > rectB.y
  ) {
    return true;
  }

  return false
}

export const areCirclesColliding = (colliderA: ColliderInterface, colliderB: ColliderInterface): boolean => {
  const rectA = colliderA.getBoundingBox()
  const rectB = colliderB.getBoundingBox()

  const centerA = rectA.getCenter()
  const centerB = rectB.getCenter()
  const radiusA = rectA.w - rectB.x
  const radiusB = rectB.w - rectB.x

  const collisionDistanceSquared = Math.pow(radiusA + radiusB, 2)
  const centerDistanceSquared = Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2)


  return centerDistanceSquared < collisionDistanceSquared
}