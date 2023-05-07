import { SavedUser } from "./user.dto";

export interface Payload {
  id: number;
  password: string;
  salt: string;
  username: string;
}

export type AuthPayload = Payload | SavedUser;
