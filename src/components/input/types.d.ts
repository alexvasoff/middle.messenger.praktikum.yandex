export type InputFieldName = 'name' | 'login' | 'email' | 'password' | 'phone' | 'message';

export type Props = {
  name: InputFieldName;
  label: string;
  placeholder: string;
  style: {
    width: string
    readOnly: boolean
  }
}
