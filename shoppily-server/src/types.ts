import { User } from './schemas/User.schema';

export type Payload = {
  _id: string;
  username: string;
  email: string;
};

export interface LoginResponse {
  user: User;
  token: string;
}
