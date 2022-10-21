import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Dialog, Dialogs as DialogsProps } from './types';
import { ChatController } from '../../../../api/apiControllers/chat';
import { UserAuthController } from '../../../../api/apiControllers/userAuth';
import { baseWSUrl } from '../../../../../config';
import { store } from '../../../../utils/store';

const chatController = new ChatController();
const authController = new UserAuthController();

async function openChat(chat: Dialog) {
  const TOKEN_VALUE = await chatController.getChatToken(chat.id);
  const userIdResponse = await authController.getInfo();
  if (!userIdResponse) {
    return;
  }
  const USER_ID = userIdResponse.id;
  const CHAT_ID = chat.id;

  if (!(TOKEN_VALUE && USER_ID && CHAT_ID)) {
    return;
  }
  const socket = new WebSocket(`${baseWSUrl}/${USER_ID}/${CHAT_ID}/${TOKEN_VALUE}`);
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');

    socket.send(JSON.stringify({
      content: 'Моё первое сообщение миру!',
      type: 'message',
    }));
  });

  socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', event => {
    console.log('Получены данные', event.data);
  });

  socket.addEventListener('error', event => {
    console.log('Ошибка', (<Error><unknown>event).message);
  });
  store.set('chatSocket', socket);
}

export class Dialogs extends BaseBlock {
  constructor() {
    const props : DialogsProps = {
      dialogs: [],
      events: {
        click: async (event) => {
          const chatElement = event.target as HTMLElement;
          const selectedChatId = chatElement.dataset.chatId as string;
          const chat = this.props.dialogs.find((dialog: Dialog) => +dialog.id === +selectedChatId);
          await openChat(chat);
        },
      },
      eventsTo: '.dialog',
    };
    super('div', props);
  }

  render() {
    return tpl(this.props);
  }

  async componentDidMount() {
    const chats = await chatController.getChats();
    this.props.dialogs = chats;
  }
}
