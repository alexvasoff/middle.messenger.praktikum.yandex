import tpl from './tpl.hbs';
import './style.scss';

import { Avatar } from '../../../../components/avatar';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Props } from './types';
import { renderDOM } from '../../../../utils/renderDOM';

const props: Props = {
  avatar: new Avatar(),
  oldPassword: new Input({ name: 'oldPassword', label: 'Старый пароль' }),
  newPassword: new Input({ name: 'newPassword', label: 'Новый пароль' }),
  newPasswordGuard: new Input({ name: 'newPasswordGuard', label: 'Повторите новый пароль' }),
  savaChanges: new Button({ name: 'savaChanges', text: 'Сохранить изменения' }),
  back: new Button({ name: 'back', text: 'Назад', type: 'danger-text' }),
};

export class ProfileChangePasswordPage extends BaseBlock {
  constructor() {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
