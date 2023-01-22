import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';
import { CreateChat } from '../types';

const chatApiInstance = new HTTPTransport();

export class ChatApi extends BaseAPI {
  request() {
    return chatApiInstance.get(apiPath.getChats);
  }

  create(data: CreateChat) {
    return chatApiInstance.post(apiPath.createChat, { data });
  }
}
