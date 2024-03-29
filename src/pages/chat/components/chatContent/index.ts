import tpl from './tpl.hbs';
import './style.scss';

import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Props } from './types';
import { store, StoreEvents } from '../../../../utils/store';

export class ChatContent extends BaseBlock {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }

  componentDidMount() {
    store.on(StoreEvents.newMessages, (msg) => {
      this.props.messages = msg;
    });
  }
}

function sendMessage(messageRow: Input) {
  const { chatSocket } = store.getState();
  if (!chatSocket) {
    alert('Выберите чат');
    return;
  }
  const messageText = messageRow.getValue();
  if (!messageText) {
    alert('Введите чего-нибудь');
    return;
  }
  const messageToChat = JSON.stringify({
    content: messageText,
    type: 'message',
  });
  chatSocket.send(messageToChat);
}

export function chatContent() {
  const messageRow = new Input({ name: 'message', label: '', placeholder: 'Введите сообщение' });
  const sendButton = new Button({ name: 'sendButton', text: '->', events: { click: () => sendMessage(messageRow) } });
  const chatContentPage = new ChatContent({ messageRow, sendButton, messages: [] });
  return chatContentPage;
}
