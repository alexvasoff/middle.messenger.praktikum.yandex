import tpl from './tpl.hbs';
import './style.scss';

import input from "../../../../components/input";
import button from "../../../../components/button";

export default function chatContent() {
    const messageRow = input('message', null,'Введите сообщение');
    const sendButton = button('sendButton', '->')
    return tpl({messageRow, sendButton});
}