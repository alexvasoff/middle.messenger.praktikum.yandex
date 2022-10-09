import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { chatContent } from './components/chatContent';
import { chatList } from './components/chatList';
import { renderDOM } from '../../utils/renderDOM';

interface ChatPageProps {
  [key: string] : any,
}

class ChatPage extends BaseBlock {
  constructor(props: ChatPageProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export function chat() {
  const chatContentComponent = chatContent();
  const chatListComponent = chatList();
  const chatPage = new ChatPage({
    chatContent: chatContentComponent,
    chatList: chatListComponent,
  });
  return renderDOM('#root', chatPage);
}
