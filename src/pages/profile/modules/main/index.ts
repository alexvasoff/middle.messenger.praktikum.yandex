import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { Avatar } from '../../../../components/avatar';
import { UserAuthController } from '../../../../api/apiControllers/userAuth';
import { store } from '../../../../utils/store';
import { router } from '../../../../router';
import { setFormData } from '../../../../utils/setFormData';

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
  changePassword: new Button({
    name: 'changePassword',
    text: 'Изменить пароль',
    events: {
      click: () => {
        router.go('/changePassword');
      },
    },
  }),
  back: new Button({
    name: 'back',
    text: 'Назад',
    type: 'text',
    events: {
      click: () => {
        router.go('/messenger');
      },
    },
  }),
  exit: new Button({
    name: 'exit',
    text: 'Выйти',
    type: 'danger-text',
    events: {
      click: async () => {
        const authApi = new UserAuthController();
        const response = await authApi.logout();
        store.set('me', null);
        if (response.status === 200) {
          router.go('/');
        }
      },
    },
  }),
};

export class ProfileMainPage extends BaseBlock {
  constructor() {
    super('div', components);
    const authApi = new UserAuthController();
    authApi.getInfo().then(userInfo => {
      setFormData(userInfo);
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
