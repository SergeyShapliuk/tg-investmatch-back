<<<<<<< HEAD
import mongoose, { HydratedDocument, Model } from "mongoose";
import { USERS_COLLECTION_NAME } from '../../db/db';



=======
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { USERS_COLLECTION_NAME } from '../../db/db';


>>>>>>> origin/main
/* =======================
   Types
======================= */

<<<<<<< HEAD
export type Donuts = {
  current_amount: string;
  purpose_amount: string;
  currency: string;
};
=======
// export type Donuts = {
//   current_amount: string;
//   purpose_amount: string;
//   currency: string;
// };
>>>>>>> origin/main

export interface User {
  tg_id: string;
  tg_firstname: string;
  tg_lastname: string;
  tg_nick: string;
  tg_language: string;

  created_at: string;
  updated_at: string;

<<<<<<< HEAD
  user_types: string[];
  industries: string[];
  business_models: string[];
  project_stages: string[];
  geography: string[];

  name: string;
  wallet: string;
  description: string;
  photos: any[];

  user_type: 'founder' | 'investor' | 'both';
  looking_for: ('founder' | 'investor')[];

  donuts: Donuts;
  hashtags: { [key: string]: string[] };
=======
  amount: number;
  time_end: number;
  time_start: number;
  timer_active: boolean;
  // photos: any[];

  // donuts: Donuts;
  // hashtags: { [key: string]: string[] };
>>>>>>> origin/main
}

type UserModel = Model<User>;
export type UserDocument = HydratedDocument<User>;

/* =======================
   Sub Schemas
======================= */

// Donuts
<<<<<<< HEAD
const donutsSchema = new mongoose.Schema<Donuts>(
  {
    current_amount: { type: String, default: "0" },
    purpose_amount: { type: String, default: "0" },
    currency: { type: String, default: "USD" }
  },
  { _id: false }
);

// hashtags: { [key: string]: string[] }
const hashtagsSchema = new mongoose.Schema(
  {},
  { _id: false, strict: false }
);
=======
// const donutsSchema = new mongoose.Schema<Donuts>(
//   {
//     current_amount: { type: String, default: '0' },
//     purpose_amount: { type: String, default: '0' },
//     currency: { type: String, default: 'USD' },
//   },
//   { _id: false },
// );
>>>>>>> origin/main

/* =======================
   Main User Schema
======================= */

const UserSchema = new mongoose.Schema<User>({
  tg_id: { type: String, required: true, unique: true },
<<<<<<< HEAD
  tg_firstname: { type: String, default: "" },
  tg_lastname: { type: String, default: "" },
  tg_nick: { type: String, default: "" },
  tg_language: { type: String, default: "en" },
=======
  tg_firstname: { type: String, default: '' },
  tg_lastname: { type: String, default: '' },
  tg_nick: { type: String, default: '' },
  tg_language: { type: String, default: 'en' },
>>>>>>> origin/main

  created_at: { type: String, default: () => new Date().toISOString() },
  updated_at: { type: String, default: () => new Date().toISOString() },

<<<<<<< HEAD
  user_types: { type: [String], default: [] },
  industries: { type: [String], default: [] },
  business_models: { type: [String], default: [] },
  project_stages: { type: [String], default: [] },
  geography: { type: [String], default: [] },

  name: { type: String, default: "" },
  wallet: { type: String, default: "" },
  description: { type: String, default: "" },
  photos: { type: [String], default: [] },

  user_type: {
    type: String,
    enum: ['founder', 'investor', 'both'],
    default: 'founder',
    index: true
  },

  // Для фильтрации
  looking_for: [{
    type: String,
    enum: ['founder', 'investor']
  }],

  donuts: {
    type: donutsSchema,
    default: () => ({
      current_amount: "0",
      purpose_amount: "0",
      currency: "USD"
    })
  },

  hashtags: {
    type: Map,
    of: [String],
    default: {}
  }
});

// UserSchema.index({ tg_id: 1 }, { unique: true });

UserSchema.index({ user_type: 1, created_at: -1 }); // для сортировки
UserSchema.index({ looking_for: 1 }); // для фильтрации
UserSchema.index({ industries: 1 }); // для поиска по индустрии
UserSchema.index({ updated_at: -1 }); // для получения свежих пользователей

/* =======================
   Model
======================= */

export const UserModel = mongoose.model<User, UserModel>(
  USERS_COLLECTION_NAME,
  UserSchema
=======
  amount: { type: Number, default: 0 },
  time_end: { type: Number, default: 0 },
  time_start: { type: Number, default: 0 },
  timer_active: { type: Boolean, default: false },

  // name: { type: String, default: '' },
  // wallet: { type: String, default: '' },
  // description: { type: String, default: '' },
  // photos: { type: [String], default: [] },

  // donuts: {
  //   type: donutsSchema,
  //   default: () => ({
  //     current_amount: '0',
  //     purpose_amount: '0',
  //     currency: 'USD',
  //   }),
  // },
  //
  // hashtags: {
  //   type: Map,
  //   of: [String],
  //   default: {},
  // },
});

/* =======================
   Model
======================= */
UserSchema.index({ time_end: 1, timer_active: 1 });

export const UserModel = mongoose.model<User, UserModel>(
  USERS_COLLECTION_NAME,
  UserSchema,
>>>>>>> origin/main
);
