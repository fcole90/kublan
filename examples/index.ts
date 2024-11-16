import { game as ping } from "./ping";
import { game as pong } from "./pong";

export interface ExampleGame {
    load: () => Promise<void>;
}

const games = {
    ping,
    pong,
} satisfies Record<string, ExampleGame>


const getGameSelector = (): HTMLElement => {
    const gameSelector = document.createElement('div')
    gameSelector.setAttribute(
        'style', 
        'display: flex; flex-direction: flex-column;',
    )
    const children = Object.entries(games).map(([name, game]) => {
        const button = document.createElement('button')
        button.textContent = name;
        button.onclick = game.load
        return button;
    })
    gameSelector.replaceChildren(...children)
    return gameSelector;
} 


const load = async () => {
    const root = document.getElementById('root')
    root?.replaceChildren(getGameSelector())
}

export const examples: ExampleGame = {
    load
}