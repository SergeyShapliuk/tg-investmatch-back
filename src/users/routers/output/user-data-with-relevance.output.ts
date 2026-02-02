import { UserOutput } from './user.output';

export type UserDataWithRelevanceOutput = {
  success: boolean;
  message: string;
  feed: { relevance: number, user: UserOutput  }[];
};
