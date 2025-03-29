import { settings } from '../../gameSettings';
import { Scene2D } from '../../nodes/Scene2D';
import { Shape2D, shape2Dtypes } from '../../nodes/Shape2D';
import { Ball } from './Ball';
import { Paddle } from './Paddle';

export class MainScene extends Scene2D {
  _ready(): void {
    const field = new Shape2D({
      position: [0, 0],
      size: settings.viewportSize,
      shapeType: shape2Dtypes.rectangle,
      color: 'green',
    });
    const mainPlayer = new Paddle({
      position: [0, settings.viewportSize.y / 2 - 40],
      isUserControlled: true,
    });
    const otherPlayer = new Paddle({
      position: [
        settings.viewportSize.x - 10,
        settings.viewportSize.y / 2 - 40,
      ],
    });
    const ball = new Ball({
      position: [
        settings.viewportSize.x / 2 - 20,
        settings.viewportSize.y / 2 - 20,
      ],
    });

    field.addChild(mainPlayer);
    field.addChild(otherPlayer);
    field.addChild(ball);

    const maxBalls = 100;
    for (let i = 0; i < maxBalls; i++) {
      const gap = settings.viewportSize.y / maxBalls;
      field.addChild(
        new Ball({
          position: [
            settings.viewportSize.x / 2,
            settings.viewportSize.y / 2 - (maxBalls / 2) * gap + gap * i,
          ],
        }),
      );
    }

    this.addChild(field);
    super._ready();
  }
}
