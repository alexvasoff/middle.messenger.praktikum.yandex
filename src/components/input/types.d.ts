import { BaseProps } from '../../utils/baseBlock';

export type InputFieldName = 'name' | 'first_name' | 'second_name' | 'login' | 'email' |
                             'password' | 'passwordGuard' | 'phone' | 'message' | 'search' | 'display_name';

export interface Props extends BaseProps {
  events?: { blur: () => void; focus: () => void };
  name: InputFieldName;
  label?: string;
  placeholder: string;
  style?: {
    width?: string
    readOnly?: boolean
  }
}
