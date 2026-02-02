import mongoose, { Model, HydratedDocument } from 'mongoose';
import { STATICS_CURRENCY_COLLECTION_NAME } from '../../db/db';



export interface Currency {
  id: number;
  currency: string;
  created_at: string;
}

type CurrencyModel = Model<Currency>;
export type CurrencyDocument = HydratedDocument<Currency>;

const CurrencySchema = new mongoose.Schema<Currency>({
  id: { type: Number, required: true, unique: true },
  currency: { type: String, required: true, unique: true },

  created_at: {
    type: String,
    default: () => new Date().toISOString()
  }
});

export const CurrencyModel = mongoose.model<Currency, CurrencyModel>(
  STATICS_CURRENCY_COLLECTION_NAME,
  CurrencySchema
);
