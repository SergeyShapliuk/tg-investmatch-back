import { UserOutput } from './user.output';

export type UserDataOutput = {
  success: boolean;
  message: string;
  user: UserOutput | null;
};
