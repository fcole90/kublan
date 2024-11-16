import { ExampleGame } from ".."
import { kublan } from "../../src/lib"


const load = async () => {
    console.log('Pong')
    kublan.load()
}

export const game: ExampleGame = {
    load
}
