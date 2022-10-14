import tpl from './tpl.hbs';
import './style.scss';

import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { BaseBlock } from '../../../../utils/baseBlock';
import { router } from '../../../../router';

class ChatList extends BaseBlock {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export function chatList() {
  const props = {
    settings: new Button({
      name: 'profile',
      text: 'Настройки профиля',
      events: {
        click: () => {
          router.go('/settings');
        },
      },
    }),
    createChat: new Button({ name: 'createChat', text: 'Создать чат', type: 'text' }),
    search: new Input({ name: 'search', placeholder: 'Поиск' }),
  };
  const chatListComponent = new ChatList(props);
  return chatListComponent;
}
