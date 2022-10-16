import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';

const logoutApiInstance = new HTTPTransport();

export class LogoutApi extends BaseAPI {
  request() {
    return logoutApiInstance.post(apiPath.logout);
  }
}
