import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../../../utils/baseBlock';
import { Avatar } from '../../../../components/avatar';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { Props } from './types';
import { router } from '../../../../router';
import { UserAuthController } from '../../../../api/apiControllers/userAuth';
import { UserProfileController } from '../../../../api/apiControllers/userProfile';
import { getFormData } from '../../../../utils/getFormData';
import { setFormData } from '../../../../utils/setFormData';

const authApi = new UserAuthController();
const profileApi = new UserProfileController();

function goBack() {
  router.back();
}

function editData() {
  const formData = getFormData();
  profileApi.editData(formData);
}

const props: Props = {
  avatar: new Avatar(),
  mail: new Input({ name: 'email', label: 'Почта', placeholder: 'Введите почту' }),
  login: new Input({ name: 'login', label: 'Логин', placeholder: 'Введите логин' }),
  name: new Input({ name: 'first_name', label: 'Имя', placeholder: 'Введите имя' }),
  surname: new Input({ name: 'second_name', label: 'Фамилия', placeholder: 'Введите фамилию' }),
  displayName: new Input({ name: 'display_name', label: 'Имя в чате', placeholder: 'Введите ник' }),
  phone: new Input({ name: 'phone', label: 'Телефон', placeholder: 'Введите телефон' }),
  savaChanges: new Button({
    name: 'savaChanges',
    text: 'Сохранить изменения',
    events: {
      click: editData,
    },
  }),
  back: new Button({
    name: 'back',
    text: 'Назад',
    type: 'danger-text',
    events: {
      click: goBack,
    },
  }),
};

export class ProfileEditDataPage extends BaseBlock {
  constructor() {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }

  async componentDidMount(oldProps) {
    const userInfo = await authApi.getInfo();
    setFormData(userInfo);
  }
}
