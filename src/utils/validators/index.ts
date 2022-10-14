import { InputFieldName } from '../../components/input/types';

// латиница или кириллица, первая буква должна быть заглавной,
// без пробелов и без цифр, нет спецсимволов (допустим только дефис).
export const nameReg = /^[A-ZА-Я]+[a-zа-яA-ZА-Я-]{2,19}/;

// от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
// без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
export const loginReg = /(?=.*[a-zA-Z])[a-zA-Z0-9\\_-]{2,19}/;

// латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть
// «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
export const emailReg = /^[\w\d]+@\w+\.\w+/;

// от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
export const passwordReg = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-я\d]{8,39}$/;

// от 10 до 15 символов, состоит из цифр, может начинается с плюса.
export const phoneReg = /^\+?\d{9,15}$/;

// не должно быть пустым.
export const messageReg = /.*/;

export const regExp = {
  name: nameReg,
  first_name: nameReg,
  second_name: nameReg,
  login: loginReg,
  email: emailReg,
  password: passwordReg,
  passwordGuard: passwordReg,
  phone: phoneReg,
  message: messageReg,
};

export function validate(fieldName: InputFieldName, value: string) : boolean {
  if (!(fieldName in regExp)) {
    throw new Error('Указан несуществующий fieldName');
  }
  return regExp[fieldName].test(value);
}
