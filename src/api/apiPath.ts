import { baseApiUrl } from '../../config';

const apiRoutes = {
  login: '/auth/signin',
  signUp: '/auth/signup',
  getUser: '/auth/user',
  logout: '/auth/logout',
  editData: '/user/profile',
  changePassword: '/user/password',
  changeAvatar: '/user/profile/avatar',
  getChats: '/chats',
  createChat: '/chats',
  getChatToken: '/chats/token/',
};

function getFullPath(path: string) {
  return baseApiUrl + path;
}

const apiPath = Object.entries(apiRoutes).reduce((acc, [key, value]) => {
  acc[key] = getFullPath(value);
  return acc;
}, {});

export { apiPath };
