import { WithId } from 'mongodb';
<<<<<<< HEAD
import { User, UserModel } from '../domain/user.model';
import { UserQueryInput } from '../routers/input/user-query.input';
import { UserAttributes } from './dtos/user-attributes';
import { bcryptService } from '../../core/adapters/bcrypt.service';
import { inject, injectable } from 'inversify';
import { UsersRepository } from '../repositories/users.repository';
import { UsersQwRepository } from '../repositories/users.query.repository';
import { UserUpdateInput } from '../routers/input/user-update.input';
=======
import { User } from '../domain/user.model';
import { UserQueryInput } from '../routers/input/user-query.input';
import { inject, injectable } from 'inversify';
import { UsersRepository } from '../repositories/users.repository';
import { UsersQwRepository } from '../repositories/users.query.repository';
import { TasksRepository } from '../../tasks/repositories/tasks.repository';
import { DEFAULT_TASKS } from '../../tasks/seed/seed.tasks';
import { TasksModel } from '../../tasks/domain/task.model';
>>>>>>> origin/main


@injectable()
export class UserService {
  constructor(
    @inject(UsersRepository) private usersRepository: UsersRepository,
    @inject(UsersQwRepository) private usersQwRepository: UsersQwRepository,
<<<<<<< HEAD
  ) {
  }

  async findMany(): Promise<WithId<User>[]> {
    return this.usersQwRepository.findMany();
=======
    @inject(TasksRepository) private tasksRepository: TasksRepository,
  ) {
  }

  async findMany(
    queryDto: UserQueryInput,
  ): Promise<{ items: WithId<User>[]; totalCount: number }> {
    return this.usersQwRepository.findMany(queryDto);
>>>>>>> origin/main
  }

  async findByIdOrFail(tgId: string): Promise<WithId<User>> {
    return this.usersRepository.findByIdOrFail(tgId);
  }

  async findByTgId(tgId: string): Promise<WithId<User> | null> {
    return this.usersRepository.findByTgId(tgId);
  }

<<<<<<< HEAD
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
=======
  async createTimer(tgId: string): Promise<WithId<User> | null> {
    const now = Math.floor(Date.now() / 1000);
    const duration = 120; // 7 часов

    const updated = await this.usersRepository.createTimer({
      tg_id: tgId,
      time_start: now,
      time_end: now + duration,
    });

    if (!updated) return null;

    // вернуть актуального пользователя для фронта
    const user = await this.usersRepository.findByTgId(tgId);
    return user;
  }

  async stopTimer(tgId: string): Promise<WithId<User> | null> {

    const updated = await this.usersRepository.finishTimerAndAddAmount(tgId);
    const user = await this.usersRepository.findByTgId(tgId);
    console.log('stopTimeruser', user);
    console.log('stopTimer', updated);
    if (!updated) return null;

    // вернуть актуального пользователя для фронта
    // const user = await this.usersRepository.findByTgId(tgId);
    // console.log('stopTimeruser', user);
    return user;
  }

  async createUserAndInitTasks(data: {
    tg_id: string;
    tg_firstname: string;
    tg_lastname: string;
    tg_nick: string;
    tg_language: string;
  }) {
    const { created } = await this.usersRepository.createIfNotExists(data);

    // ⬇️ ТОЛЬКО ПРИ ПЕРВОМ СОЗДАНИИ
    if (created) {
      await TasksModel.insertMany(DEFAULT_TASKS(data.tg_id));
    }

    return { created };
>>>>>>> origin/main
  }

  async delete(id: string): Promise<void> {

    await this.usersRepository.delete(id);
    return;
  }
}

