import { Vector2 } from "@kublan/engine/src/primitives/Vector2";


export const settings = {
  viewportSize: new Vector2([800, 600]),
  pageBackgroundColor: 'pink',
  targetFPS: 30,
} as const;

export type GameSettings = typeof settings
