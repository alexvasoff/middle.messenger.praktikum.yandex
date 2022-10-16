export interface LoginData {
  login: string;
  password: string;
}

export interface SignUp {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface EditData extends Omit<SignUp, 'password'>{
  display_name: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
