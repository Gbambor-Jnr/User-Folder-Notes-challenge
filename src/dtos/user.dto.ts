import { IsEmail, Length } from "class-validator";

export interface UserInputs {
  username: string;
  name: string;
  password: string;
}
export interface LoginInputs {
  username: string;
  password: string;
}

export interface SavedUser {
  id: number;
  salt: string;
  username: string;
  name: string;
  password: string;
}
