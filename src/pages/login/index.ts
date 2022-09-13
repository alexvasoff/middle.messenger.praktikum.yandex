import tpl from './tpl.hbs';

import { button, Button } from '../../components/button';
import { Props, Props as ButtonProps } from '../../components/button/types';
import { input, Input } from '../../components/input';
import { Props as InputProps } from '../../components/input/types';
import { renderDOM } from '../../utils/renderDOM';
import { BaseBlock } from '../../utils/baseBlock';

export default function login() {
  // const components = {
  //   login: input('login', 'Логин', 'Введите логин'),
  //   password: input('password', 'Пароль', 'Введите пароль'),
  //   sign: button('sign', 'Вход'),
  //   register: button('register', 'Регистрация', 'text'),
  // };
  // return tpl(components);
  const loginInputProps: InputProps = {
    name: 'login',
    label: 'Логин',
    placeholder: 'Введите логин',
  };

  const passInputProps: InputProps = {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
  };

  const signButtonProps: ButtonProps = {
    name: 'sign',
    text: 'Вход',
  };

  const registerButtonProps: ButtonProps = {
    name: 'register',
    text: 'Регистрация',
    type: 'text',
  };
  /*const components = {
    login: new Input(loginInputProps),
    password: new Input(passInputProps),
    sign: new Button(signButtonProps),
    register: new Button(registerButtonProps),
  };*/

  class LoginPage extends BaseBlock {
    constructor(props: Props) {
      super('div', props);
    }

    render() {
      console.log(this.props);
      return tpl(this.props);
    }
  }

  // const loginPage = new LoginPage(components);
  // const btn = new Button(registerButtonProps);
  const inp = new Input(loginInputProps);
  // console.log(components);
  console.log(loginInputProps);
  return renderDOM('#root', inp);
  // return tpl(components);
}
