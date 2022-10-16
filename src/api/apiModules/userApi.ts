import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';
import { EditData, ChangePassword } from '../types';

const userApiInstance = new HTTPTransport();

export class UserApi extends BaseAPI {
  request() {
    return userApiInstance.get(apiPath.getUser);
  }

  updateData(data: EditData) {
    return userApiInstance.put(apiPath.editData, { data });
  }

  updatePassword(data: ChangePassword) {
    return userApiInstance.put(apiPath.changePassword, { data });
  }
}

/*
* Тут ведь не надо создавать отдельные классы для изменения Данных и Пароля?
* */
