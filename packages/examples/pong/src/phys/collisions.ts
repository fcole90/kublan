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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (colliderA.colliderType === colliderTypes.box2D && colliderB.colliderType === colliderTypes.box2D) {
    return areBox2DColliding(colliderA, colliderB)
  }

  throw new Error('Collision between ' + colliderA.colliderType + ' and ' + colliderB.colliderType + ' not supported')
}

export const areBox2DColliding = (colliderA: ColliderInterface, colliderB: ColliderInterface): boolean => {
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