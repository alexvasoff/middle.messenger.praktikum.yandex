import tpl from './tpl.hbs';
import './style.scss';

import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { BaseBlock } from '../../../../utils/baseBlock';

class ChatContent extends BaseBlock {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export function chatContent() {
  const messageRow = new Input({ name: 'message', label: '', placeholder: 'Введите сообщение' });
  const sendButton = new Button({ name: 'sendButton', text: '->' });
  const chatContentPage = new ChatContent({ messageRow, sendButton });
  return chatContentPage;
}
