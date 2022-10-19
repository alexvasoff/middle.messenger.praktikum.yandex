import { CreateChat } from '../types';
import { ChatApi } from '../apiModules/chatApi';
import { ChatTokenApi } from '../apiModules/chatTokenApi';

const chatApi = new ChatApi();
const tokenApi = new ChatTokenApi();

export class ChatController {
  public async getChats() {
    const response = await chatApi.request();
    if (response.status !== 200) {
      alert('Не удалось загрузить чаты');
      return;
    }
    const chats = JSON.parse(response.response);
    return chats;
  }

  public async createChat(data: CreateChat) {
    const response = await chatApi.create(data);
    if (response.status !== 200) {
      alert('Не удалось создать чат');
    }
    alert('Чат успешно создан!');
  }

  public async getChatToken(id: string) {
    const response = await tokenApi.create(id);
    if (response.status !== 200) {
      alert('Не удалось получить Токен');
    }
    const { token } = JSON.parse(response.response);
    return token;
  }
}
