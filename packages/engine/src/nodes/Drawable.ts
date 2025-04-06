import { Renderer } from "../render/Renderer";
import { BaseNode } from "./BaseNode";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawableConfig { }

export interface Drawable {
  draw(renderer: Renderer): void
}

export type DrawableNode = BaseNode & Drawable;

export const isDrawableNode = (node: BaseNode): node is DrawableNode => {
  return 'draw' in node && typeof node.draw === 'function';
};
