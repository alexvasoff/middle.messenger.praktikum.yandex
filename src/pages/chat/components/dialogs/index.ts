import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Dialog } from './types';
import { ChatController } from '../../../../api/apiControllers/chat';
import { UserAuthController } from '../../../../api/apiControllers/userAuth';
import { baseWSUrl } from '../../../../../config';

const chatController = new ChatController();
const authController = new UserAuthController();

async function openChat(chat) {
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
    console.log('Ошибка', event.message);
  });
}

export class Dialogs extends BaseBlock {
  constructor() {
    const props : { dialogs: Dialog[], events: Record<string, Function> } = {
      dialogs: [],
      events: {
        click: async (event) => {
          const selectedChatId = event.target.dataset.chatId;
          const chat = this.props.dialogs.find(chat => chat.id == selectedChatId);
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

/*
* Данный компонент работает со списком чатов, получаемый (!первоначально!) из API
* Как лучше получать список чатов? Через пропс для компонента или делать это внутри него?
* Первый вариант кажется правильным, но местами избыточным. Второй добавляет магию внутри компонента.
* Плюс нельзя будет напрямую управлять отображением компонента, например, меняя набор объектов в пропсах.
* Но можно управлять логикой изменения через store, т.ч., похоже, что нет какого-то верного решения?
* Пока писал вопрос, осознал, что это +- тоже самое, что и во Vue мы можем управлять как пропсами, так и самим объектом через $ref
* Больше зависит от архитектуры проекта и выбранными решениями внутри команды, верно?
* */
