import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';
import { ChangePassword, EditData } from '../types';

import { UserApi } from '../apiModules/userApi';
import { router } from '../../router';

const request = new HTTPTransport();

const userApi = new UserApi();

export class UserProfileController {
  public async editData(data: EditData) {
    const response = await userApi.updateData(data);
    if (response.status !== 200) {
      alert('Не удалось изменить данные!');
      return;
    }
    router.go('/messenger');
  }

  public changePassword(data: ChangePassword) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.put(apiPath.changePassword, options);
  }

  public changeAvatar(data) {
    return request.put(apiPath.changeAvatar, { data });
  }
}
