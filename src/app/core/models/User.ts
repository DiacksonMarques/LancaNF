export interface User{
  id?: number
  name: string;
  surname: string;
  userName?: string;
  password?: string;
  tokenUser?: string;
}

export interface LoginUser{
  userName: string;
  password: string;
}
