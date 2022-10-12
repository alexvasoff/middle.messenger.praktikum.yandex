import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Props as ButtonProps } from '../../components/button/types';
import { Input } from '../../components/input';
import { Props as InputProps } from '../../components/input/types';
import { Props as LoginPageProps } from './types';
import { BaseBlock } from '../../utils/baseBlock';

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

const components: LoginPageProps = {
  login: new Input(loginInputProps),
  password: new Input(passInputProps),
  sign: new Button(signButtonProps),
  register: new Button(registerButtonProps),
};

export class LoginPage extends BaseBlock {
  constructor() {
    super('div', components);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
