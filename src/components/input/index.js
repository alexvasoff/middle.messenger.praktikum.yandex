import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';

Handlebars.registerPartial('input', tpl);

export class Input extends BaseBlock {
  constructor(props) {
    super('div', props);
  }

  render() {
    return tpl(this.props);
  }
}

export function input(name, label, placeholder, style = {}) {
  style.width = style.width || '280px'; // длина инпута
  style.readOnly = style.readOnly || false;
  const readonly = style.readOnly ? 'readonly' : '';
  const className = readonly ? 'input__field_readonly' : '';
  return tpl({
    name, label, placeholder, readonly, style, className,
  });
}
