import { Form } from '../domain/static.form.model';
import { staticsCurrencyCollection, staticsFormCollection } from '../../db/db';
import { Currency } from '../domain/static.currency.model';


export class StaticsQueryRepository {

  async findManyForms(): Promise<Form[]> {

    const items = await staticsFormCollection
      .find()
      // .sort({ order: 1 })
      .toArray();

    return items;
  }

  async findManyCurrencies(): Promise<Currency[]> {

    const items = await staticsCurrencyCollection
      .find()
      // .sort({ order: 1 })
      .toArray();

    return items;
  }

  // async findById(id: string): Promise<IUserView | null> {
  //     const user = await db
  //         .getCollections()
  //         .usersCollection.findOne({ _id: new ObjectId(id) });
  //     return user ? this._getInView(user) : null;
  // },
  // _getInView(user: WithId<IUserDB>): IUserView {
  //     return {
  //         id: user._id.toString(),
  //         login: user.login,
  //         email: user.email,
  //         createdAt: user.createdAt.toISOString(),
  //     };
  // },
  // _checkObjectId(id: string): boolean {
  //     return ObjectId.isValid(id);
  // },
}
