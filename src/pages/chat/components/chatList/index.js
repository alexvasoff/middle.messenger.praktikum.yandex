import tpl from './tpl.hbs';
import './style.scss';

import { button } from "../../../../components/button";
import { input } from "../../../../components/input";

export function chatList() {
    const settings = button('profile', 'Настройки профиля');
    const search = input('search', null, 'Поиск');
    return tpl({settings, search});
}