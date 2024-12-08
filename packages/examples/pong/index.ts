import { ExampleGame } from "@examples/common/types"
// import { kublan } from "@kublan/engine"
import { settings } from "./src/gameSettings"
import { Core } from "./src/engine/Core"
import { MainScene } from "./src/scenes/main/MainScene"

interface CreateGameCanvasOptions {
    size: { x: number, y: number }
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

const createGameCanvas = ({ size }: CreateGameCanvasOptions): HTMLCanvasElement => {
    const canvas = document.createElement('canvas')
    canvas.width = size.x
    canvas.height = size.y
    canvas.setAttribute('style', `
         image-rendering: pixelated;
         background-color: red;
        `)


    return canvas
}


// eslint-disable-next-line @typescript-eslint/require-await
const load: ExampleGame['load'] = async (rootElement) => {
    resetHTML(rootElement, settings.pageBackgroundColor)
    const gameCanvas = createGameCanvas({ size: settings.viewportSize })
    rootElement.replaceChildren(gameCanvas)

    const ctx = gameCanvas.getContext('2d')
    if (ctx == null) {
        console.error('Could not load context')
        return
    }

    const pong = new Core({
        ctx,
        rootScene: new MainScene()
    })
    pong.start()
}

export const game: ExampleGame = {
    load
}
