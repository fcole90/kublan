import { game as pong } from '@examples/pong';
import { game as physSandbox } from '@examples/phys-sandbox';
import { ExampleGame } from '@examples/common/types';

const games = {
  pong,
  physSandbox,
} satisfies Record<string, ExampleGame>;

const getGameSelector = (rootElement: HTMLElement): HTMLElement => {
  const gameSelector = document.createElement('div');
  gameSelector.setAttribute(
    'style',
    `
        display: flex; 
        flex-direction: column;
        gap: 0.5rem;
        `,
  );
  const children = Object.entries(games).map(([name, game]) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => game.load(rootElement);
    return button;
  });
  gameSelector.replaceChildren(...children);
  return gameSelector;
};

// eslint-disable-next-line @typescript-eslint/require-await
const load = async (rootElement: HTMLElement) => {
  rootElement.replaceChildren(getGameSelector(rootElement));
};

export const examples: ExampleGame = {
  load,
};
