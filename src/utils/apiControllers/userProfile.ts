import { HTTPTransport } from '../httpTransport';
import { apiPath } from './apiPath';

interface editData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

const request = new HTTPTransport();

export class UserProfileController {
  public editData(data: editData) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.put(apiPath.editData, options);
  }
}
