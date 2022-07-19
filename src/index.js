import {sum} from './modules/sum.js';
const root = document.querySelector('#root');
root.textContent = sum(6, -1).toString();