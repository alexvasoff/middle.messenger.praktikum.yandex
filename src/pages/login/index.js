import tpl from './tpl.hbs';

import { button } from "../../components/button";
import { input } from "../../components/input";


export default function login() {
    const components = {
        login: input('login', 'Логин', 'Введите логин'),
        password: input('password', 'Пароль', 'Введите пароль'),
        sign: button('sign', 'Вход'),
        register: button('register', 'Регистрация', 'text'),
    }
    return tpl(components);
}