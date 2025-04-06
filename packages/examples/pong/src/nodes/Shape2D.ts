import {
  Vector2,
  Vector2Initializer,
} from '@kublan/engine/src/primitives/Vector2';
import { Renderer } from '@kublan/engine/src/render/Renderer';
import { checkExhaustiveCondition } from '@kublan/engine/src/utils/typing/checkExhaustiveConditon';
import { Node2D, Node2DConfig } from './Node2D';

export const shape2Dtypes = {
  rectangle: 'rectangle',
  circle: 'circle',
} as const;

export type Shape2DType = keyof typeof shape2Dtypes;

export interface Shape2DConfig extends Node2DConfig {
  size: Vector2Initializer;
  color?: string;
  shapeType: Shape2DType;
}

export class Shape2D extends Node2D {
  color: string;
  shapeType: Shape2DType;

  constructor(config: Shape2DConfig) {
    super(config);
    this.color = config.color ?? 'white';
    this.shapeType = config.shapeType;
  }

  override _draw(renderer: Renderer) {
    switch (this.shapeType) {
      case shape2Dtypes.rectangle: {
        console.log('Shape2D._draw:', {
          id: this.id,
          color: this.color,
          shapeType: this.shapeType,
          'this._getAbsolutePosition()': this._getAbsolutePosition(),
          'this._getAbsolutePosition().toArray()':
            this._getAbsolutePosition().toArray(),
          'this.getSize().toArray()': this.getSize().toArray(),
        });
        renderer.drawRectangle(
          [
            ...this._getAbsolutePosition().toArray(),
            ...this.getSize().toArray(),
          ],
          this.color,
        );
        break;
      }

      case shape2Dtypes.circle: {
        const position = this._getAbsolutePosition();
        const size = this.getSize();
        renderer.drawCircle(
          new Vector2(position.x + size.x / 2, position.y + size.y / 2),
          size.x / 2,
          this.color,
        );
        break;
      }

      default: {
        checkExhaustiveCondition(
          this.shapeType,
          (strRepr) => 'Shape ' + strRepr + 'not supported',
        );
      }
    }
  }
}
