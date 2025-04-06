import { Vector2 } from '@kublan/engine/src/primitives/Vector2';

export const settings = {
  viewportSize: Vector2.from([800, 600]),
  pageBackgroundColor: 'pink',
  targetFPS: 30,
} as const;

export type PongSettings = typeof settings;
