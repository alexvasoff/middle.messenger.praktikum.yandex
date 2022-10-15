import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';
import { store } from '../../utils/store';
import { router } from '../../router';

interface loginData {
  login: string;
  password: string;
}

interface signUp {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

const request = new HTTPTransport();

export class UserAuthController {
  public login(data: loginData) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.post(apiPath.login, options);
  }

  public signUp(data: signUp) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.post(apiPath.signUp, options);
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

  public logout() {
    return request.post(apiPath.logout);
  }
}