import getPage from './router';

window.onload = function () {
  document.getElementById('root').innerHTML = getPage();
};
