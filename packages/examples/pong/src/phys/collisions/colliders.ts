import { Rectangle } from '@kublan/engine/src/primitives/Rectangle';
import { Vector2 } from '@kublan/engine/src/primitives/Vector2';

export const colliderTypes = {
  rect: 'rect',
  circle: 'circle',
} as const;

export type ColliderType = keyof typeof colliderTypes;

export interface Collider2DInterface {
  id: symbol;
  colliderType: ColliderType;
  getSize: () => Vector2;
  getBoundingBox: () => Rectangle;
}

export interface RectCollider2D extends Collider2DInterface {
  colliderType: typeof colliderTypes.rect;
}

export interface CircleCollider2D extends Collider2DInterface {
  colliderType: typeof colliderTypes.rect;
}

export type Collider2D = RectCollider2D | CircleCollider2D;
