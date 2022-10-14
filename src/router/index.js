import login from '../pages/login';
import registration from '../pages/registration';
import { chat } from '../pages/chat';
import { profile } from '../pages/profile';
import editData from '../pages/profile/modules/editData';
import changePassword from '../pages/profile/modules/changePassword';
import notFound from '../pages/notFound';
import serverError from '../pages/serverError';

const routes = {
  '/': login,
  '/register': registration,
  '/chat': chat,
  '/settings': profile,
  '/changeData': editData,
  '/changePassword': changePassword,
  '/notFound': notFound,
  '/serverError': serverError,
};

function getPage() {
  const currentPath = window.location.pathname;
  const page = routes[currentPath];
  return page() || routes['/notFound']();
}

export default getPage;
