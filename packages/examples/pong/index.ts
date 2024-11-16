import { ExampleGame } from "@examples/common/types"
import { kublan } from "@kublan/engine"


const load = async () => {
    console.log('Pong')
    kublan.load()
}

export const game: ExampleGame = {
    load
}
