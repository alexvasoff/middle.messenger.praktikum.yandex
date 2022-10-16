import { HTTPTransport } from '../../utils/httpTransport';
import { apiPath } from '../apiPath';
import { ChangePassword, EditData } from '../types';

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

  public changeAvatar(data) {
    return request.put(apiPath.changeAvatar, { data });
  }
}
