import { store } from '../../utils/store';
import { router } from '../../router';
import { LoginData, SignUp, UserData } from '../types';

import { LoginApi } from '../apiModules/loginApi';
import { LogoutApi } from '../apiModules/logoutApi';
import { SignUpApi } from '../apiModules/signUpApi';
import { UserApi } from '../apiModules/userApi';

export class UserAuthController {
  public async login(data: LoginData) {
    const loginApi = new LoginApi();
    const response = await loginApi.create(data);
    if (response.status !== 200) {
      alert('Ошибка в логине или пароле');
      return;
    }
    router.go('/messenger');
  }

  public async signUp(data: SignUp) {
    const signUpApi = new SignUpApi();
    const response = await signUpApi.create(data);
    if (response.status !== 200) {
      const { reason } = JSON.parse(response.response);
      alert(`Не удалось создать пользователя, ${reason}`);
      return;
    }
    router.go('/');
  }

  public getInfo(): Promise<UserData> {
    const cache: UserData = store.getState().me;
    if (cache && Object.keys(cache)) {
      return new Promise(resolve => {
        resolve(cache);
      });
    }
    return new Promise((resolve, reject) => {
      const userApi = new UserApi();
      userApi.request().then(response => {
        let userInfo: UserData;
        if (response instanceof XMLHttpRequest) {
          if (response.status !== 200) {
            router.go('/');
            reject(response);
            return;
          }
          userInfo = JSON.parse(response.response);
          store.set('me', userInfo);
        } else {
          userInfo = response;
        }
        resolve(userInfo);
      });
    });
  }

  public async logout() {
    const logoutApi = new LogoutApi();
    const response = await logoutApi.request();
    if (response.status === 200) {
      store.set('me', null);
      router.go('/');
    }
  }
}
