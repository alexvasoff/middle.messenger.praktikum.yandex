import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { Props } from "./types";

export class Button extends BaseBlock {
  constructor(props: Props) {
    props.type ||= 'default';
    super('div', props);
  }

  render() {
    return tpl(this.props);
  }
}

export function button(name, text, type = 'default') {
  return tpl({ name, text, type });
}
