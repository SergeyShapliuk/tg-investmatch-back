import { inject, injectable } from 'inversify';
import { StaticsQueryRepository } from '../repositories/statics.query.repository';
import { Form } from '../domain/static.form.model';
import { Currency } from '../domain/static.currency.model';


@injectable()
export class StaticService {
  constructor(
    // @inject(StaticsRepository) private usersRepository: StaticsRepository,
    @inject(StaticsQueryRepository) private staticsQueryRepository: StaticsQueryRepository,
  ) {
  }

  async findManyForms(): Promise<Form[]> {
    return this.staticsQueryRepository.findManyForms();
  }

  async findManyCurrencies(): Promise<Currency[]> {
    return this.staticsQueryRepository.findManyCurrencies();
  }

  // async findByIdOrFail(tgId: string): Promise<WithId<User>> {
  //     return this.usersRepository.findByIdOrFail(tgId);
  // }
  //
  // async findByTgId(tgId: string): Promise<WithId<User>> {
  //     return this.usersRepository.findByTgId(tgId);
  // }
  //
  // async create(dto: UserAttributes): Promise<string> {
  //     const {login, password, email} = dto;
  //     const passwordHash = await bcryptService.generateHash(password);
  //
  //
  //     const newUser: any = {
  //         login,
  //         email,
  //         passwordHash,
  //         createdAt: new Date().toISOString(),
  //         emailConfirmation: {
  //             confirmationCode: "",
  //             isConfirmed: true,
  //             expirationDate: new Date().toISOString()
  //         }
  //     };
  //
  //     return await this.usersRepository.create(newUser);
  // }
  //
  // async delete(id: string): Promise<void> {
  //
  //     await this.usersRepository.delete(id);
  //     return;
  // }
}

