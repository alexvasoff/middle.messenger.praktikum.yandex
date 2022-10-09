import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { renderDOM } from '../../../../utils/renderDOM';
import { Avatar } from '../../../../components/avatar';

export class ProfileMain extends BaseBlock {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export function main() {
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
    changeDate: new Button({ name: 'changeDate', text: 'Изменить данные' }),
    changePassword: new Button({ name: 'changePassword', text: 'Изменить пароль' }),
    back: new Button({ name: 'back', text: 'Назад', type: 'text' }),
    exit: new Button({ name: 'exit', text: 'Выйти', type: 'danger-text' }),
  };
  const profileMainComponent = new ProfileMain(components);
  return renderDOM('#root', profileMainComponent);
}
