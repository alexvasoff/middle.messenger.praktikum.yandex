import tpl from './tpl.hbs';
import './style.scss';

export function button(name, text, type = 'default') {
  return tpl({ name, text, type });
}
