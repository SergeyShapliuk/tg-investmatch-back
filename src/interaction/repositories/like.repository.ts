import { ObjectId, WithId } from 'mongodb';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { userCollection } from '../../db/db';
import { injectable } from 'inversify';
import { Interaction, InteractionDocument, InteractionModel } from '../domain/interaction.model';
import mongoose from 'mongoose';
import { User, UserModel } from '../../users/domain/user.model';


@injectable()
export class LikeRepository {

  // async findById(id: string): Promise<WithId<Interaction> | null> {
  //   console.log('id', id);
  //   return userCollection.findOne({ _id: new ObjectId(id) });
  // }
  //
  // async findByIdOrFail(id: string): Promise<WithId<Interaction>> {
  //   const res = await userCollection.findOne({ _id: new ObjectId(id) });
  //
  //   if (!res) {
  //     throw new RepositoryNotFoundError('MatchModel not exist');
  //   }
  //   return res;
  // }
  async getMyLikesRaw(myTgId: string): Promise<Interaction[]> {
    return InteractionModel.find({
      from_user_tg_id: myTgId,
      type: 'like',
    })
      .select('to_user_tg_id created_at')
      .lean();
  }

  async getMyMatchesRaw(myTgId: string): Promise<Interaction[]> {
    return InteractionModel.find({
      is_match: true,
      $or: [
        { from_user_tg_id: myTgId },
        { to_user_tg_id: myTgId },
      ],
    }).lean();
  }

  async getMyLikes(myTgId: string): Promise<User[]> {
    const likes = await this.getMyLikesRaw(myTgId);
    if (!likes.length) return [];

    const tgIds = likes.map(l => l.to_user_tg_id);

    const users = await UserModel.find({
      tg_id: { $in: tgIds },
    })
      // .select("tg_id name photos")
      .lean();
// console.log('users',users)
    return users;
  }

  async getMyMatches(myTgId: string): Promise<User[]> {
    const matches = await this.getMyMatchesRaw(myTgId);
    if (!matches.length) return [];

    const tgIds = matches.map(l => l.to_user_tg_id);

    const users = await UserModel.find({
      tg_id: { $in: tgIds },
    })
      // .select("tg_id name photos")
      .lean();
// console.log('users',users)
    return users;
  }

  async getLikesToMe(myTgId: string) {
    return InteractionModel.find({
      to_user_tg_id: myTgId,
      type: 'like',
    })
      .select('from_user_tg_id is_match created_at')
      .lean();
  }



  async create(
    fromTgId: string,
    toTgId: string,
    type: 'like' | 'dislike',
  ): Promise<boolean> {
    // 1. Проверка на себя
    if (fromTgId === toTgId) {
      return false;
    }

    // 2. Ищем существующее взаимодействие (любого типа)
    const existingInteraction = await InteractionModel.findOne({
      from_user_tg_id: fromTgId,
      to_user_tg_id: toTgId,
    });

    // 3. Если взаимодействие уже существует
    if (existingInteraction) {
      // 3a. Если тип не изменился - ничего не делаем
      if (existingInteraction.type === type) {
        return false;
      }

      // 3b. Если тип изменился (например, был like, теперь dislike)
      existingInteraction.type = type;
      existingInteraction.updated_at = new Date();

      // Если меняем с like на dislike, нужно проверить и удалить мэтч если был
      if (existingInteraction.type === 'dislike' && existingInteraction.is_match) {
        existingInteraction.is_match = false;

        // Также убираем мэтч у обратного взаимодействия
        await InteractionModel.updateOne(
          {
            from_user_tg_id: toTgId,
            to_user_tg_id: fromTgId,
          },
          { $set: { is_match: false } }
        );
      }

      await existingInteraction.save();

      // Если поставили лайк, проверяем на мэтч
      if (type === 'like') {
        return await this.checkForMatch(fromTgId, toTgId);
      }

      return false;
    }

    // 4. Если взаимодействия не было - создаем новое
    const interaction = await InteractionModel.create({
      from_user_tg_id: fromTgId,
      to_user_tg_id: toTgId,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // 5. Если это дизлайк - просто сохраняем
    if (type === 'dislike') {
      return false;
    }

    // 6. Если это лайк - проверяем на мэтч
    return await this.checkForMatch(fromTgId, toTgId);
  }

// Вынесенная функция проверки мэтча
  private async checkForMatch(fromTgId: string, toTgId: string): Promise<boolean> {
    // Ищем обратный лайк
    const reverseLike = await InteractionModel.findOne({
      from_user_tg_id: toTgId,
      to_user_tg_id: fromTgId,
      type: 'like',
    });

    // Если обратного лайка нет или уже есть мэтч
    if (!reverseLike || reverseLike.is_match) {
      return false;
    }

    // Создаем мэтч
    await InteractionModel.updateMany(
      {
        from_user_tg_id: { $in: [fromTgId, toTgId] },
        to_user_tg_id: { $in: [fromTgId, toTgId] },
        type: 'like',
      },
      {
        $set: {
          is_match: true,
          matched_at: new Date()
        }
      }
    );

    return true;
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError('MatchModel not exist');
    }
    return;
  }

}
