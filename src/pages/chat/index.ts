import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { ChatContent, chatContent } from './components/chatContent';
import { ChatList, chatList } from './components/chatList';
import { ChatController } from '../../api/apiControllers/chat';
import { UserAuthController } from '../../api/apiControllers/userAuth';

const authApi = new UserAuthController();
const chatApi = new ChatController();

interface ChatPageProps {
  chatContent : ChatContent;
  chatList : ChatList;
}

const pageProps: ChatPageProps = {
  chatContent: chatContent(),
  chatList: chatList(),
};

export class ChatPage extends BaseBlock {
  constructor() {
    super('div', pageProps);
  }

  render() {
    return this.compile(tpl, this.props);
  }

  async openChat(chat) {
    const response = await chatApi.getChatToken(chat.id);
    if (response.status !== 200) {
      console.log(('Не удалось получить токен чата'));
      return;
    }
    const TOKEN_VALUE = response.response;
    const USER_ID = await authApi.getInfo();
    if (!USER_ID) {
      return;
    }
    const CHAT_ID = chat.id;

    if (!(TOKEN_VALUE && USER_ID && CHAT_ID)) {
      console.log('Не все данные указаны');
      console.log('TOKEN_VALUE, USER_ID, CHAT_ID:', TOKEN_VALUE, USER_ID, CHAT_ID);
      return;
    }

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${USER_ID}>/${CHAT_ID}>/${TOKEN_VALUE}>`);
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
      console.log('Ошибка', event.message);
    });
  }

  renderChats(chats) {
    const chatsPlace = document.getElementsByClassName('dialogs')[0];
    const fragment = document.createDocumentFragment();
    for (const chat of chats) {
      const newChat = document.createElement('p');
      newChat.innerText = chat.title;
      newChat.onclick = () => {
        this.openChat(chat);
      };
      fragment.append(newChat);
    }
    chatsPlace.append(fragment);
  }

  async componentDidMount(oldProps) {
    const response = await chatApi.getChats();
    if (response.status !== 200) {
      console.log('Не удалось загрузить чаты');
      return;
    }
    const chats = JSON.parse(response.response);
    this.renderChats(chats);
  }
}
