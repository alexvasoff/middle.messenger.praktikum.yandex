import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { chatContent } from './components/chatContent';
import { chatList } from './components/chatList';

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
}
