import { ExampleGame } from "@examples/common/types"
import { kublan } from "@kublan/engine"
import { settings } from "./src/gameSettings"
import { Pong } from "./src/Pong"

interface CreateGameCanvasOptions {
    width: number,
    height: number,
}

const resetHTML = (rootElement: HTMLElement, backgroundColor: string) => {
    document.getElementsByTagName('body')[0].setAttribute('style', `
        box-sizing: border-box;
        margin: 0;
        `)
    rootElement.setAttribute('style', `
        background-color: ${backgroundColor};
        display: flex;
        height: 100vh;
        width: 100vw;
        margin: 0;
        `)
}

const createGameCanvas = ({ width, height }: CreateGameCanvasOptions): HTMLCanvasElement => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.setAttribute('style', `
         image-rendering: pixelated;
        `)


    return canvas
}


const load: ExampleGame['load'] = async (rootElement) => {
    resetHTML(rootElement, settings.pageBackgroundColor)
    const gameCanvas = createGameCanvas(settings.size)
    rootElement.replaceChildren(gameCanvas)

    const ctx = gameCanvas.getContext('2d')
    if (ctx == null) {
        console.error('Could not load context')
        return
    }

    const pong = new Pong(ctx)
    pong.start()
}

export const game: ExampleGame = {
    load
}
