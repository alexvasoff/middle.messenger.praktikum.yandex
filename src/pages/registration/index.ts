import tpl from './tpl.hbs';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { BaseBlock } from '../../utils/baseBlock';
import { Props as RegistrationProps } from './types';
import { router } from '../../router';
import { UserAuthController } from '../../utils/apiControllers/userAuth';

async function onRegister() {
  const inputFields = document.getElementsByTagName('input');
  const params = {};
  for (const inputField of inputFields) {
    console.log(inputField);
    params[inputField.name] = inputField.value;
  }
  const authApi = new UserAuthController();
  const response = await authApi.signUp(params);
  if (response.status !== 200) {
    console.log('Не удалось создать пользователя');
    console.log(response);
    return;
  }
  router.go('/');
}

const events = {
  click: onRegister,
};

const components: RegistrationProps = {
  mail: new Input({ name: 'email', label: 'Почта', placeholder: 'Введите почту' }),
  login: new Input({ name: 'login', label: 'Логин', placeholder: 'Введите логин' }),
  name: new Input({ name: 'first_name', label: 'Имя', placeholder: 'Введите имя' }),
  surname: new Input({ name: 'second_name', label: 'Фамилия', placeholder: 'Введите фамилию' }),
  phone: new Input({ name: 'phone', label: 'Телефон', placeholder: 'Введите телефон' }),
  password: new Input({ name: 'password', label: 'Пароль', placeholder: 'Введите пароль' }),
  passwordGuard: new Input({ name: 'passwordGuard', label: 'Пароль (ещё раз)', placeholder: 'Повторите пароль' }),
  registration: new Button({ name: 'registration', text: 'Регистрация', events }),
  sign: new Button({ name: 'sign', text: 'Вход', type: 'text' }),
};

export class RegistrationPage extends BaseBlock {
  constructor() {
    super('div', components);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
