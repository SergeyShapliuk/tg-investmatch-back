import { WithId } from 'mongodb';
import { User, UserModel } from '../domain/user.model';
import { UserQueryInput } from '../routers/input/user-query.input';
import { UserAttributes } from './dtos/user-attributes';
import { bcryptService } from '../../core/adapters/bcrypt.service';
import { inject, injectable } from 'inversify';
import { UsersRepository } from '../repositories/users.repository';
import { UsersQwRepository } from '../repositories/users.query.repository';
import { UserUpdateInput } from '../routers/input/user-update.input';


@injectable()
export class UserService {
  constructor(
    @inject(UsersRepository) private usersRepository: UsersRepository,
    @inject(UsersQwRepository) private usersQwRepository: UsersQwRepository,
  ) {
  }

  async findMany(): Promise<WithId<User>[]> {
    return this.usersQwRepository.findMany();
  }

  async findByIdOrFail(tgId: string): Promise<WithId<User>> {
    return this.usersRepository.findByIdOrFail(tgId);
  }

  async findByTgId(tgId: string): Promise<WithId<User> | null> {
    return this.usersRepository.findByTgId(tgId);
  }

  async create(dto: UserAttributes): Promise<string> {
    const {
      tg_id,
      tg_nick = '',
      tg_firstname = '',
      tg_lastname = '',
      tg_language = 'en',
      business_models = [],
      description = '',
      geography = [],
      industries = [],
      name = '',
      project_stages = [],
      user_types = [],
      wallet = '',
      donuts = { current_amount: 0, purpose_amount: '0', currency: 'USD' },
    } = dto;
    // const passwordHash = await bcryptService.generateHash(password);


    const newUserData: UserAttributes = {
      tg_id,
      tg_nick,
      tg_firstname,
      tg_lastname,
      tg_language,
      business_models,
      description,
      geography,
      industries,
      name,
      project_stages,
      user_types,
      wallet,
      donuts,
    };

    const newUser = new UserModel(newUserData);

    return await this.usersRepository.create(newUser);
  }

  async getRelevance(tgId: string, userTgId: string): Promise<number> {
    const user = this.usersRepository.findByTgId(tgId);
    const userRelevance = this.usersRepository.findByTgId(userTgId);
    return 20;
  }

  async userUpdate(dto: UserUpdateInput): Promise<void> {
    await this.usersRepository.updateUser(dto);
  }

  async delete(id: string): Promise<void> {

    await this.usersRepository.delete(id);
    return;
  }
}

