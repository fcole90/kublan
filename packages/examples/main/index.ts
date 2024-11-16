import { game as pong } from "@examples/pong";
import { ExampleGame } from "@examples/common/types";

const games = {
    pong,
} satisfies Record<string, ExampleGame>


const getGameSelector = (): HTMLElement => {
    const gameSelector = document.createElement('div')
    gameSelector.setAttribute(
        'style', 
        `
        display: flex; 
        flex-direction: column;
        gap: 0.5rem;
        `,
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