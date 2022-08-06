import tpl from './tpl.hbs';
import image from '/static/img/emptyAvatar.svg'
import './style.scss'

export default function avatar (img=image) {
    return tpl({img});
}