import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';

const tokenApiInstance = new HTTPTransport();

export class ChatTokenApi extends BaseAPI {
  create(id: string | number) {
    return tokenApiInstance.post(apiPath.getChatToken + id);
  }
}
