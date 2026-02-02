<<<<<<< HEAD


export type UserUpdateInput = {
  tg_id: string;
  business_models?: string[];
  description?: string;
  geography?: string[];
  industries?: string[];
  name?: string;
  project_stages?: string[];
  user_types?: string[];
  wallet?: string;
=======
import { ResourceType } from '../../../core/types/resource-type';


export type UserUpdateInput = {
  // data: {
  //     type: ResourceType.Posts;
  //     id: string;
  //     attributes: PostAttributes;
  // };
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
>>>>>>> origin/main
};
