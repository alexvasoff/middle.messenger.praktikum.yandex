import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { chatContent } from './components/chatContent';
import { chatList } from './components/chatList';
import { ChatController } from '../../utils/apiControllers/chat';

const chatApi = new ChatController();

interface ChatPageProps {
  chatContent : unknown;
  chatList : unknown;
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

  openChat(chat) {
    console.log('open chat', chat);
  }

  renderChats(chats) {
    console.log('asdsadasdas');
    console.log(chats);
    const chatsPlace = document.getElementsByClassName('dialogs')[0];
    console.log(chatsPlace);
    for (const chat of chats) {
      console.log(chat);
      const newChat = document.createElement('p');
      newChat.innerText = chat.title;
      newChat.onclick = () => {
        this.openChat(chat);
      };
      chatsPlace.append(newChat);
    }
    // const a = document.createElement(p);
  }

  async componentDidMount(oldProps) {
    const response = await chatApi.getChats();
    if (response.status !== 200) {
      console.log('Не удалось загрузить чаты');
      return;
    }
    const chats = JSON.parse(response.response);
    console.log('Список чатов:', chats);
    this.renderChats(chats);
  }
}
