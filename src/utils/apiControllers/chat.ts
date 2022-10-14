import { HTTPTransport } from '../httpTransport';
import { apiPath } from './apiPath';

interface CreateChat {
  title: string;
}

const request = new HTTPTransport();

export class ChatController {
  public getChats() {
    return request.get(apiPath.getChats);
  }

  public createChat(data: CreateChat) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.post(apiPath.createChat, options);
  }

  public getChatToken(id: string) {
    return request.get(apiPath.getChatToken + id);
  }
}
