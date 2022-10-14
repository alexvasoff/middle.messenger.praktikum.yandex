import { HTTPTransport } from '../httpTransport';
import { apiPath } from './apiPath';

interface EditData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

const request = new HTTPTransport();

export class UserProfileController {
  public editData(data: EditData) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.put(apiPath.editData, options);
  }

  public changePassword(data: ChangePassword) {
    const options = {
      data: JSON.stringify(data),
    };
    return request.put(apiPath.changePassword, options);
  }
}
