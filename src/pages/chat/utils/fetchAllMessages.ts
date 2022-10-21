import { store } from '../../../utils/store';
import { baseWSUrl } from '../../../../config';

export function fetchAllMessages(chatID: number, token: string) {
  const state = store.getState();
  const userID = state.me.id;
  const messages: any[] = [];
  const socket = new WebSocket(`${baseWSUrl}/${userID}/${chatID}/${token}`);

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  });

  socket.addEventListener('message', (event) => {
    if (event.data.includes('token')) {
      return;
    }
    const response = JSON.parse(event.data);
    if (!Array.isArray(response)) {
      store.addMessage(response);
      return;
    }
    response.forEach((data: any) => {
      messages.push(data);
    });
    const reversedMessages = messages.reverse();
    store.setMessages(reversedMessages);
  });
}
