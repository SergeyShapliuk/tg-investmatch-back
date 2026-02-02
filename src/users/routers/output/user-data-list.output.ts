import { UserOutput } from './user.output';

export type UserDataListOutput = {
  success: boolean;
  message: string;
  users: UserOutput[];
};
