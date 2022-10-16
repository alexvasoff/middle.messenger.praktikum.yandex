import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { BaseBlock } from '../../utils/baseBlock';
import { Props as RegistrationProps } from './types';
import { router } from '../../router';
import { UserAuthController } from '../../api/apiControllers/userAuth';
import { getFormData } from '../../utils/getFormData';

async function onRegister() {
  const params = getFormData();
  const authController = new UserAuthController();
  await authController.signUp(params);
}

const registerEvents = {
  click: onRegister,
};

const signEvents = {
  click: () => {
    router.go('/');
  },
};

const components: RegistrationProps = {
  mail: new Input({ name: 'email', label: 'Почта', placeholder: 'Введите почту' }),
  login: new Input({ name: 'login', label: 'Логин', placeholder: 'Введите логин' }),
  name: new Input({ name: 'first_name', label: 'Имя', placeholder: 'Введите имя' }),
  surname: new Input({ name: 'second_name', label: 'Фамилия', placeholder: 'Введите фамилию' }),
  phone: new Input({ name: 'phone', label: 'Телефон', placeholder: 'Введите телефон' }),
  password: new Input({ name: 'password', label: 'Пароль', placeholder: 'Введите пароль' }),
  passwordGuard: new Input({ name: 'passwordGuard', label: 'Пароль (ещё раз)', placeholder: 'Повторите пароль' }),
  registration: new Button({ name: 'registration', text: 'Регистрация', events: registerEvents }),
  sign: new Button({
    name: 'sign', text: 'Вход', type: 'text', events: signEvents,
  }),
};

export class RegistrationPage extends BaseBlock {
  constructor() {
    super('div', components);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
