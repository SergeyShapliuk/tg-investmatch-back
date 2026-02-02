import { ObjectId, WithId } from 'mongodb';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { User, UserDocument } from '../domain/user.model';
import { userCollection } from '../../db/db';
import { injectable } from 'inversify';
import { UserUpdateInput } from '../routers/input/user-update.input';


@injectable()
export class UsersRepository {

  async findById(id: string): Promise<WithId<User> | null> {
    console.log('id', id);
    return userCollection.findOne({ _id: new ObjectId(id) });
  }

  async findByIdOrFail(id: string): Promise<WithId<User>> {
    const res = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('MatchModel not exist');
    }
    return res;
  }

  async findByTgId(tgId: string): Promise<WithId<User> | null> {
    const res = await userCollection.findOne({ tg_id: tgId });

    // if (!res) {
    //     throw new RepositoryNotFoundError("MatchModel not exist");
    // }
    console.log('findByTgId', res);
    return res;
  }

  async create(newUser: UserDocument): Promise<string> {
    const insertResult = await newUser.save();
    return insertResult._id.toString();
  }

  async updateUser(dto: UserUpdateInput): Promise<void> {
    const updateResult = await userCollection.updateOne(
      { tg_id: dto.tg_id },
      { $set: dto },
    );

    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError('User not exist');
    }
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
