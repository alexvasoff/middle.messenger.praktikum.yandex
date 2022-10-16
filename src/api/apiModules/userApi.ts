import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';

const userApiInstance = new HTTPTransport();

export class UserApi extends BaseAPI {
  request() {
    return userApiInstance.get(apiPath.getUser);
  }
}
