import * as jwt from 'jsonwebtoken';
import { Payload } from 'src/types';

export const signToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded as Payload;
};
