import tpl from './tpl.hbs';

import { button } from "../../components/button";
import { input } from "../../components/input";

export default function registration() {
    const components = {
        mail: input('email', 'Почта', 'Введите почту'),
        login: input('login', 'Логин', 'Введите логин'),
        name: input('first_name', 'Имя', 'Введите имя'),
        surname: input('second_name', 'Фамилия', 'Введите фамилию'),
        phone: input('phone', 'Телефон', 'Введите телефон'),
        password: input('password', 'Пароль', 'Введите пароль'),
        passwordGuard: input('passwordGuard', 'Пароль (ещё раз)', 'Повторите пароль'),
        //
        registration: button('registration', 'Регистрация'),
        sign: button('sign', 'Вход', 'text'),
    };
    return tpl(components);
}