import tpl from './tpl.hbs';
import './style.scss'

import avatar from "../../../../components/avatar";
import { button } from "../../../../components/button";
import { input } from "../../../../components/input";

export default function main() {
    const components = {
        avatar: avatar(),
        mail: input('email', 'Почта', 'Введите почту', {readOnly: true}),
        login: input('login', 'Логин', 'Введите логин', {readOnly: true}),
        name: input('first_name', 'Имя', 'Введите имя', {readOnly: true}),
        surname: input('second_name', 'Фамилия', 'Введите фамилию', {readOnly: true}),
        displayName: input('display_name', 'Имя в чате', 'Введите ник', {readOnly: true}),
        phone: input('phone', 'Телефон', 'Введите телефон', {readOnly: true}),
        //
        changeDate: button('changeDate', 'Изменить данные'),
        changePassword: button('changePassword', 'Изменить пароль'),
        back: button('back', 'Назад', 'text'),
        exit: button('exit', 'Выйти', 'danger-text'),
    };
    return tpl(components);
}