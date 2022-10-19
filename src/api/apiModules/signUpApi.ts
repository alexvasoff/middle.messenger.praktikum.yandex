import { BaseAPI } from './baseApi';
import { HTTPTransport } from '../../utils/httpTransport';
import { SignUp } from '../types';
import { apiPath } from '../apiPath';

const signUpApiInstance = new HTTPTransport();

export class SignUpApi extends BaseAPI {
  create(data: SignUp) {
    return signUpApiInstance.post(apiPath.signUp, { data });
  }
}
