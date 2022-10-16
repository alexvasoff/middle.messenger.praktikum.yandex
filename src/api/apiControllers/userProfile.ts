import { ChangePassword, EditData } from '../types';

import { UserApi } from '../apiModules/userApi';
import { router } from '../../router';
import { store } from '../../utils/store';

const userApi = new UserApi();

export class UserProfileController {
  public async editData(data: EditData) {
    const response = await userApi.updateData(data);
    if (response.status !== 200) {
      alert('Не удалось изменить данные!');
      return;
    }
    const updatedData = JSON.parse(response.response);
    store.set('me', updatedData);
    router.go('/messenger');
  }

  public async changePassword(data: ChangePassword) {
    const response = await userApi.updatePassword(data);
    if (response.status !== 200) {
      const { reason } = JSON.parse(response.response);
      alert(`Не удалось поменять пароль! ${reason}`);
      return;
    }
    alert('Пароль успешно изменен');
    router.go('/settings');
  }
}
