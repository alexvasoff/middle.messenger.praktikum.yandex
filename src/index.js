import getPage from './router';

window.onload = function () {
  const page = getPage();
  if (typeof page === 'string') {
    document.getElementById('root').innerHTML = getPage();
  }
};
