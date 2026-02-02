<<<<<<< HEAD
export type Donuts = {
  current_amount: string;
  purpose_amount: string;
  currency: string;
};

export type UserOutput = {
  id:string;
=======


export type UserOutput = {
>>>>>>> origin/main
  tg_id: string;
  tg_firstname: string;
  tg_lastname: string;
  tg_nick: string;
  tg_language: string;
<<<<<<< HEAD
  created_at: string;
  updated_at: string;
  user_types: string[];
  industries: string[];
  business_models: string[];
  project_stages: string[];
  geography: string[];
  name: string;
  wallet: string;
  description: string;
  photos: any[];
  donuts: Donuts;
  hashtags: { [key: string]: string[] };
=======

  amount: number;
  time_end: number;
  time_start: number;
>>>>>>> origin/main
};
