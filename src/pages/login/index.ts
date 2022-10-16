import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Props as ButtonProps } from '../../components/button/types';
import { Input } from '../../components/input';
import { Props as InputProps } from '../../components/input/types';
import { Props as LoginPageProps } from './types';
import { BaseBlock } from '../../utils/baseBlock';
import { router } from '../../router';
import { UserAuthController } from '../../api/apiControllers/userAuth';

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

const authApi = new UserAuthController();

async function onLogin() {
  const login = document.getElementById(loginInputProps.name).value;
  const password = document.getElementById(passInputProps.name).value;
  if (!(login && password)) {
    alert('Не указан логин или пароль.\n '
      + '*Если все указано, то, пожалуйста, перезагрузите страницу');
    return;
  }
  await authApi.login({ login, password });
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
  events: {
    click() {
      router.go('/register');
    },
  },
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

  async componentDidMount() {
    const userInfo = await authApi.getInfo();
    if (!userInfo) {
      return;
    }
    router.go('/messenger');
  }
}
