import mongoose, { Model, HydratedDocument } from 'mongoose';
import { INTERACTION_COLLECTION_NAME } from '../../db/db';

export type InteractionType = 'like' | 'dislike';

export interface Interaction {
  from_user_tg_id: string;
  to_user_tg_id: string;
  type: InteractionType;
  is_match: boolean;
  created_at: Date;
  updated_at?: Date;
}

type InteractionModel = Model<Interaction>;
export type InteractionDocument = HydratedDocument<Interaction>;

const InteractionSchema = new mongoose.Schema<Interaction>(
  {
    from_user_tg_id: {
      type: String,
      required: true,
    },
    to_user_tg_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: true,
    },
    is_match: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now, // ✅ Значение по умолчанию
    },
  },
  {
    timestamps: false,
  },
);

/**
 * why:
 * быстрый доступ к матчам
 */
InteractionSchema.index(
  { from_user_tg_id: 1, to_user_tg_id: 1 },
  { unique: true },
);

/**
 * why:
 * фильтрация like / dislike
 */
InteractionSchema.index({ type: 1 });

export const InteractionModel = mongoose.model<Interaction,
  InteractionModel>(INTERACTION_COLLECTION_NAME, InteractionSchema);
