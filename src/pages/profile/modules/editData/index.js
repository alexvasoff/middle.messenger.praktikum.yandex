import tpl from './tpl.hbs';
import './style.scss'

import avatar from "../../../../components/avatar";
import { button } from "../../../../components/button";
import input from "../../../../components/input";

export default function editData() {
    const components = {
        avatar: avatar(),
        mail: input('email', 'Почта', 'Введите почту'),
        login: input('login', 'Логин', 'Введите логин'),
        name: input('first_name', 'Имя', 'Введите имя'),
        surname: input('second_name', 'Фамилия', 'Введите фамилию'),
        displayName: input('display_name', 'Имя в чате', 'Введите ник'),
        phone: input('phone', 'Телефон', 'Введите телефон'),
        //
        savaChanges: button('savaChanges', 'Сохранить изменения'),
        back: button('back', 'Назад', 'danger-text'),
    };
    return tpl(components);
}