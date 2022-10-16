import tpl from './tpl.hbs';
import './style.scss';

import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { BaseBlock } from '../../../../utils/baseBlock';
import { router } from '../../../../router';
import { ChatController } from '../../../../api/apiControllers/chat';
import { Dialogs } from '../dialogs';

const chatApi = new ChatController();

export class ChatList extends BaseBlock {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

async function addChat() {
  const chatName = window.prompt('Введите название чата:', `Чат ${new Date().getSeconds()}`);
  if (!chatName) {
    return;
  }
  await chatApi.createChat({ title: chatName });
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
    createChat: new Button({
      name: 'createChat',
      text: 'Создать чат',
      type: 'text',
      events: {
        click: addChat,
      },
    }),
    search: new Input({ name: 'search', placeholder: 'Поиск' }),
    dialogs: new Dialogs(),
  };
  const chatListComponent = new ChatList(props);
  return chatListComponent;
}
