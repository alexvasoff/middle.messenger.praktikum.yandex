import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { ChatContent, chatContent } from './components/chatContent';
import { ChatList, chatList } from './components/chatList';

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
}
