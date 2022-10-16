import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';
import { store } from '../../utils/store';
import { router } from '../../router';
import { LoginData, SignUp } from '../types';

import { LoginApi } from '../apiModules/loginApi';
import { LogoutApi } from '../apiModules/logoutApi';

const request = new HTTPTransport();

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

  public signUp(data: SignUp) {
    return request.post(apiPath.signUp, { data });
  }

  public getInfo() {
    const cache = store.getState().me;
    if (cache && Object.keys(cache)) {
      return new Promise(resolve => {
        resolve(cache);
      });
    }
    return new Promise((resolve, reject) => {
      request.get(apiPath.getUser, {}).then(response => {
        let userInfo = null;
        if (response instanceof XMLHttpRequest) {
          if (response.status !== 200) {
            console.log('Что-то пошло не так');
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
