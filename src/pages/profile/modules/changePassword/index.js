import tpl from './tpl.hbs';
import './style.scss'

import avatar from "../../../../components/avatar";
import { button } from "../../../../components/button";
import input from "../../../../components/input";

export default function changePassword() {
    const components = {
        avatar: avatar(),
        oldPassword: input('oldPassword', 'Старый пароль'),
        newPassword: input('newPassword', 'Новый пароль'),
        newPasswordGuard: input('newPasswordGuard', 'Повторите новый пароль'),
        //
        savaChanges: button('savaChanges', 'Сохранить изменения'),
        back: button('back', 'Назад', 'danger-text'),
    };
    return tpl(components);
}