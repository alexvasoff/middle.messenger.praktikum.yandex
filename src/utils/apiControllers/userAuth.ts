import { HTTPTransport } from '../httpTransport';
import { apiPath } from './apiPath';
import { store } from '../store';

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
  public async login(data: loginData) {
    const options = {
      credentials: 'include',
      data: JSON.stringify(data),
    };
    return request.post(apiPath.login, options);
  }

  public async signUp(data: signUp) {
    const options = {
      credentials: 'include',
      data: JSON.stringify(data),
    };
    return request.post(apiPath.signUp, options);
  }

  public async getInfo() {
    const cache = store.getState().me;
    if (cache && Object.keys(cache)) {
      console.log('есть кэш');
      return new Promise(resolve => {
        resolve(cache);
      });
    }
    return new Promise((resolve, reject) => {
      console.log('123');
      request.get(apiPath.getUser, {}).then(response => {
        console.log(response);
        let userInfo = null;
        if (response instanceof XMLHttpRequest) {
          console.log(response);
          console.log(response.status);
          if (response.status !== 200) {
            console.log(response.status !== 200);
            console.log('Что-то пошло не так');
            reject(response);
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
}
