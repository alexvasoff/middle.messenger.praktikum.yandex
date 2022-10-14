import { LoginPage } from '../pages/login';
import { RegistrationPage } from '../pages/registration';
import { ChatPage } from '../pages/chat';
import { ProfileMainPage } from '../pages/profile/modules/main';
import { ProfileEditDataPage } from '../pages/profile/modules/editData';
import { ProfileChangePasswordPage } from '../pages/profile/modules/changePassword';
import notFound from '../pages/notFound';
import serverError from '../pages/serverError';
import { Router } from '../utils/router/router';

const routesMap = {
  '/': LoginPage,
  '/register': RegistrationPage,
  '/messenger': ChatPage,
  '/settings': ProfileMainPage,
  '/changeData': ProfileEditDataPage,
  '/changePassword': ProfileChangePasswordPage,
  '/notFound': notFound,
  '/serverError': serverError,
};

const router = new Router('#root');

Object.entries(routesMap).forEach(([path, block]) => {
  router.use(path, block);
});

console.log(router);

router.start();

export { router };
