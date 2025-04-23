import { Core } from '@kublan/engine/src/engine/Core';
import { Node2D } from '@kublan/engine/src/nodes/Node2D';

import { ExampleGame } from '@examples/common/types';

import { settings } from './src/config/settings';
import { Ball } from './src/nodes/Ball';

interface CreateGameCanvasOptions {
  size: { x: number; y: number };
}

const resetHTML = (rootElement: HTMLElement, backgroundColor: string) => {
  document.getElementsByTagName('body')[0]?.setAttribute(
    'style',
    `
    box-sizing: border-box;
    margin: 0;
    `,
  );
  rootElement.setAttribute(
    'style',
    `
    background-color: ${backgroundColor};
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    `,
  );
};

const createGameCanvas = ({
  size,
}: CreateGameCanvasOptions): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = size.x;
  canvas.height = size.y;
  canvas.setAttribute(
    'style',
    `
    image-rendering: pixelated;
    background-color: black;
    `,
  );

  return canvas;
};

// eslint-disable-next-line @typescript-eslint/require-await
const load: ExampleGame['load'] = async (rootElement) => {
  resetHTML(rootElement, 'gray');
  const gameCanvas = createGameCanvas({ size: { x: 800, y: 600 } });
  rootElement.replaceChildren(gameCanvas);

  const ctx = gameCanvas.getContext('2d');
  if (ctx == null) {
    console.error('Could not load context');
    return;
  }

  const physSandbox = new Core({
    ctx,
    settings,
    rootScene: new Node2D({
      position: [0, 0],
      children: [
        new Ball({
          center: [200, 300],
          radius: 55,
          color: 'red',
        }),
        new Ball({
          center: [500, 300],
          radius: 20,
          color: 'red',
        }),
      ],
    }),
  });
  physSandbox.start();
};

export const game: ExampleGame = {
  load,
};
