import { BaseProps } from '../../utils/baseBlock';

export type InputFieldName = 'name' | 'login' | 'email' | 'password' | 'phone' | 'message';

export interface Props extends BaseProps {
  events: { blur: () => void; focus: () => void };
  name: InputFieldName;
  label: string;
  placeholder: string;
  style?: {
    width: string
    readOnly: boolean
  }
}
