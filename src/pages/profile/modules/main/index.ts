import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { Avatar } from '../../../../components/avatar';
import { UserAuthController } from '../../../../utils/apiControllers/userAuth';
import { store } from '../../../../utils/store';
import { router } from '../../../../router';

const components = {
  avatar: new Avatar(),
  mail: new Input({
    name: 'email', label: 'Почта', placeholder: 'Введите почту', style: { readOnly: true },
  }),
  login: new Input({
    name: 'login', label: 'Логин', placeholder: 'Введите логин', style: { readOnly: true },
  }),
  name: new Input({
    name: 'first_name', label: 'Имя', placeholder: 'Введите имя', style: { readOnly: true },
  }),
  surname: new Input({
    name: 'second_name', label: 'Фамилия', placeholder: 'Введите фамилию', style: { readOnly: true },
  }),
  displayName: new Input({
    name: 'display_name', label: 'Имя в чате', placeholder: 'Введите ник', style: { readOnly: true },
  }),
  phone: new Input({
    name: 'phone', label: 'Телефон', placeholder: 'Введите телефон', style: { readOnly: true },
  }),
  changeDate: new Button({
    name: 'changeDate',
    text: 'Изменить данные',
    events: {
      click: () => {
        router.go('/changeData');
      },
    },
  }),
  changePassword: new Button({ name: 'changePassword', text: 'Изменить пароль' }),
  back: new Button({ name: 'back', text: 'Назад', type: 'text' }),
  exit: new Button({ name: 'exit', text: 'Выйти', type: 'danger-text' }),
};

export class ProfileMainPage extends BaseBlock {
  constructor() {
    super('div', components);
    const authApi = new UserAuthController();
    authApi.getInfo().then(userInfo => {
      const inputFields = document.getElementsByTagName('input');
      for (const inputField of inputFields) {
        const fieldName = inputField.name;
        if (!userInfo[fieldName]) {
          continue;
        }
        inputField.value = userInfo[fieldName];
      }
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
