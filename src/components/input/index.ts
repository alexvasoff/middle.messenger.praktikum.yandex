import tpl from './tpl.hbs';
import './style.scss';
import { BaseBlock } from '../../utils/baseBlock';
import { Props as InputProps } from './types';
import { validate } from '../../utils/validators';

function declareInputEvents(props: InputProps) {
  const validateHandler = () => {
    const fieldName = props.name;
    const inputElement = document.getElementById(fieldName) as HTMLInputElement;
    const inputText = inputElement.value;
    const isValid = validate(fieldName, inputText);
    return isValid;
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
