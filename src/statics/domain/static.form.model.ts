import mongoose, { Model, HydratedDocument } from 'mongoose';
import { STATICS_FORM_COLLECTION_NAME } from '../../db/db';



export type FormValue = {
  id: number;
  value: string;
};

export interface Form {
  type: 'user_types' | 'name' | 'industries' | 'business_models' | 'description' | 'wallet' | 'geography';
  type_id: number;
  type_title: string;
  type_value: string;
  values: FormValue[];
  // custom_values: string[];
  created_at: string;
}

type StaticFormModel = Model<Form>;
export type StaticFormDocument = HydratedDocument<Form>;

const formValueSchema = new mongoose.Schema<FormValue>(
  {
    id: Number,
    value: String,
  },
  { _id: false },
);

const StaticsFormSchema = new mongoose.Schema<Form>({
  type: { type: String, required: true },

  type_id: { type: Number, required: true, unique: true },
  type_title: { type: String, required: true },
  type_value: { type: String, required: true, unique: true },

  values: { type: [formValueSchema], default: [] },
  // custom_values: { type: [String], default: [] },

  // is_active: { type: Boolean, default: true },
  // order: { type: Number, default: 0 },

  created_at: {
    type: String,
    default: () => new Date().toISOString(),
  },

}, { _id: false });

export const StaticFormModel = mongoose.model<Form, StaticFormModel>(
  STATICS_FORM_COLLECTION_NAME,
  StaticsFormSchema,
);
