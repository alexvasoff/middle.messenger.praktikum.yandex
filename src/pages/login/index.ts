import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Props as ButtonProps } from '../../components/button/types';
import { Input } from '../../components/input';
import { Props as InputProps } from '../../components/input/types';
import { Props as LoginPageProps } from './types';
import { renderDOM } from '../../utils/renderDOM';
import { BaseBlock } from '../../utils/baseBlock';

class LoginPage extends BaseBlock {
  constructor(props: LoginPageProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default function login() {
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

  const components = {
    login: new Input(loginInputProps),
    password: new Input(passInputProps),
    sign: new Button(signButtonProps),
    register: new Button(registerButtonProps),
  };

  const loginPage = new LoginPage(components);
  return renderDOM('#root', loginPage);
}
