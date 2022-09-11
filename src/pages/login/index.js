import tpl from './tpl.hbs';

import { button } from '../../components/button';
import { input } from '../../components/input';

export default function login() {
  const components = {
    login: input('login', 'Логин', 'Введите логин'),
    password: input('password', 'Пароль', 'Введите пароль'),
    sign: button('sign', 'Вход'),
    register: button('register', 'Регистрация', 'text'),
  };
  return tpl(components);
}

/* Неудачная попытка
import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Props as ButtonProps } from '../../components/button/types.d.ts';
import { Input } from '../../components/input';

const loginInputProps = {
  name: 'login',
  label: 'Логин',
  placeholder: 'Введите логин'
}

const passInputProps = {
  name: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль'
}

const signButtonProps = {
  name: 'sign',
  text: 'Вход'
}

const registerButtonProps = {
  name: 'register',
  text: 'Регистрация',
  type: 'text',
}

export default function login() {
  const components = {
    login: new Input(loginInputProps),
    password: new Input(passInputProps),
    sign: new Button(signButtonProps),
    register: new Button(registerButtonProps),
  };
  return tpl(components);
}

* */
