import { foo as _foo } from './something/imported'

console.log("Hello word");

export const load = () => {
    console.log('load');
}

export const kublan = {
    load,
}
