import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Props as ButtonProps } from '../../components/button/types';
import { Input } from '../../components/input';
import { Props as InputProps } from '../../components/input/types';
import { Props as LoginPageProps } from './types';
import { BaseBlock } from '../../utils/baseBlock';
import { router } from '../../router';
import { UserAuthController } from '../../utils/apiControllers/userAuth';

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

async function onLogin() {
  const login = document.getElementById(loginInputProps.name).value;
  const password = document.getElementById(passInputProps.name).value;
  if (!(login && password)) {
    console.log('Не указан логин или пароль');
    return;
  }
  const authApi = new UserAuthController();
  const response = await authApi.login({ login, password });
  if (response.status !== 200) {
    console.log('Ошибка в логине или пароле');
    return;
  }
  router.go('/chat');
}

const signButtonProps: ButtonProps = {
  name: 'sign',
  text: 'Вход',
  events: {
    click: onLogin,
  },
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
