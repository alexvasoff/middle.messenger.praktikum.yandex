import tpl from './tpl.hbs';
import './style.scss';

import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Props } from './types';
import { store } from '../../../../utils/store';

export class ChatContent extends BaseBlock {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

function sendMessage(messageRow: Input) {
  const messageText = messageRow.getValue();
  const chatSocket = store.getState().chatSocket as unknown as WebSocket;
  const messageToChat = JSON.stringify({
    content: messageText,
    type: 'message',
  });
  chatSocket.send(messageToChat);
}

export function chatContent() {
  const messageRow = new Input({ name: 'message', label: '', placeholder: 'Введите сообщение' });
  const sendButton = new Button({ name: 'sendButton', text: '->', events: { click: () => sendMessage(messageRow) } });
  const chatContentPage = new ChatContent({ messageRow, sendButton });
  return chatContentPage;
}
