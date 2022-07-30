import tpl from './tpl.hbs';
import './style.scss'

import chatList from "./components/chatList";
import chatContent from "./components/chatContent";

export default function chat() {
    return tpl({chatList, chatContent});
}
