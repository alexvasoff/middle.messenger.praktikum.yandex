import { BaseBlock } from '../../utils/baseBlock';
import tpl from './tpl.hbs';

export class Login extends BaseBlock {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {});
  }
}
