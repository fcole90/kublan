import { Settings } from "@kublan/engine/src/config/settings";
import { Vector2 } from "@kublan/engine/src/primitives/Vector2";

export interface PhysSandboxSettings extends Settings {
  pageBackgroundColor: string
}

export const settings = {
  viewportSize: new Vector2([800, 600]),
  pageBackgroundColor: 'pink',
  targetFPS: 30,
} satisfies PhysSandboxSettings;
