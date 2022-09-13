import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { Props as InputProps } from './types';
import { validate } from '../../utils/validators';

Handlebars.registerPartial('input', tpl);

function declareInputEvents(props: InputProps) {
  const validateHandler = () => {
    const fieldName = props.name;
    const inputElement = document.getElementById(fieldName) as HTMLInputElement;
    const inputText = inputElement.value;
    const isValid = validate(fieldName, inputText);

    if (!isValid) {
      console.log(`Поле ${props.label} заполнено не по формату!`);
    }
  };

  const events = {
    blur: validateHandler,
    focus: validateHandler,
  };
  const eventsTo = 'input';
  return { events, eventsTo };
}

export class Input extends BaseBlock {
  constructor(props: InputProps) {
    super('div', props);
    const { events, eventsTo } = declareInputEvents(props);
    this.props.events = events;
    this.props.eventsTo = eventsTo;
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
