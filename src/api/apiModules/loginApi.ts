import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { LoginData } from '../types';
import { apiPath } from '../apiPath';

const loginApiInstance = new HTTPTransport();

export class LoginApi extends BaseAPI {
  create(data: LoginData) {
    return loginApiInstance.post(apiPath.login, { data });
  }
}
