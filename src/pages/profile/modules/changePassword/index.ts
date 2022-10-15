import tpl from './tpl.hbs';
import './style.scss';

import { Avatar } from '../../../../components/avatar';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Props } from './types';
import { UserProfileController } from '../../../../api/apiControllers/userProfile';
import { getFormData } from '../../../../utils/getFormData';
import { router } from '../../../../router';

async function onChangePass() {
  const params = getFormData();
  const profileApi = new UserProfileController();
  const response = await profileApi.changePassword(params);
  if (response !== 200) {
    console.log('Не удалось поменять пароль!');
    console.log(response);
    return;
  }
  console.log('Вы успешно изменили пароль!');
  router.go('/settings');
}

const props: Props = {
  avatar: new Avatar(),
  oldPassword: new Input({ name: 'oldPassword', label: 'Старый пароль' }),
  newPassword: new Input({ name: 'newPassword', label: 'Новый пароль' }),
  newPasswordGuard: new Input({ name: 'newPasswordGuard', label: 'Повторите новый пароль' }),
  savaChanges: new Button({
    name: 'savaChanges',
    text: 'Сохранить изменения',
    events: {
      click: onChangePass,
    },
  }),
  back: new Button({
    name: 'back',
    text: 'Назад',
    type: 'danger-text',
    events: {
      click: () => {
        router.go('/settings');
      },
    },
  }),
};

export class ProfileChangePasswordPage extends BaseBlock {
  constructor() {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
