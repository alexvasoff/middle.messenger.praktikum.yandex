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

/*
* Кажется, что для логина/выхода можно имплементировать метод request, а не create
* Но тут ведь правильнее смотреть на метод запроса? В апи используется post => дергаем его через метод create
*/
