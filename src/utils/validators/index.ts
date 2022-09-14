import { InputFieldName } from '../../components/input/types';

export const nameReg = /^[A-ZА-Я]+[a-zа-яA-ZА-Я-]{2,19}/;
export const loginReg = /(?=.*[a-zA-Z])[a-zA-Z0-9\\_-]{2,19}/;
export const emailReg = /^[\w\d]+@\w+\.\w+/;
export const passwordReg = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-я\d]{8,39}$/;
export const phoneReg = /^\+?\d{9,15}$/;
export const messageReg = /.*/;

export const regExp = {
  name: nameReg,
  first_name: nameReg,
  second_name: nameReg,
  login: loginReg,
  email: emailReg,
  password: passwordReg,
  phone: phoneReg,
  message: messageReg,
};

export function validate(fieldName: InputFieldName, value: string) : boolean {
  if (!(fieldName in regExp)) {
    throw new Error('Указан несуществующий fieldName');
  }
  return regExp[fieldName].test(value);
}
