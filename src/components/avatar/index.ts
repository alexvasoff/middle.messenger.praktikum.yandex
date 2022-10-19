import tpl from './tpl.hbs';
import image from '/static/img/emptyAvatar.svg';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { Props as AvatarProps } from './types';

export class Avatar extends BaseBlock {
  constructor(props: AvatarProps = { img: image }) {
    super('div', props);
  }

  render() {
    return tpl(this.props);
  }
}
