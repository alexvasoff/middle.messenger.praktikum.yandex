import tpl from './tpl.hbs';
import main from "./modules/main";

export default function profile() {
    let state = main;
    return tpl({state});
    // тут я вначале думал сделать локальный роутинг через модули, поэтому есть проп state
}