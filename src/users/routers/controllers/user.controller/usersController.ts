import { inject, injectable } from 'inversify';
import { UserService } from '../../../application/user.service';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../../core/types/http-ststuses';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { UserCreateInput } from '../../input/user-create.input';
import { mapToUserOutputUtil } from '../../mappers/map-to-user-output.util';
import { mapToUserWithRelevanceOutput } from '../../mappers/map-to-user-with-relevance-output';
import { UserUpdateInput } from '../../input/user-update.input';


@injectable()
export class UsersController {
  constructor(
    @inject(UserService) private userService: UserService,
  ) {
  }

  async getUserHandler(
    req: Request<{ telegram_id: string }>,
    res: Response,
  ) {
    try {

      const tgId = req.params.telegram_id;
      const user = await this.userService.findByTgId(tgId);
      console.log('getUserHandler tgId', tgId);
      const userOutput = mapToUserOutputUtil(user);
      res.status(HttpStatus.Ok).send(userOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async createUserHandler(
    req: Request<{}, {}, UserCreateInput>,
    res: Response,
  ) {
    try {
      const createdUserId = await this.userService.create(req.body);

      const createdUser = await this.userService.findByIdOrFail(createdUserId);

      const userOutput = mapToUserOutputUtil(createdUser);
      res.status(HttpStatus.Created).send(userOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async getUserListRelevanceHandler(
    req: Request<{}, {}, { tg_id: string }>,
    res: Response,
  ) {
    try {

      const tgId = req.body.tg_id;
      const users = await this.userService.findMany();
      const currentUser = users.find(u => u.tg_id === tgId);
      console.log('getUserListRelevanceHandler tgId', tgId);
      console.log('getUserListRelevanceHandler req.body', req.body);
      console.log('getUserListRelevanceHandler users', users);
      console.log('getUserListRelevanceHandler currentUser', currentUser);
      if (!currentUser) {
        return res.status(HttpStatus.Ok).send({ message: 'User not found' });
      }


      const usersOutput = mapToUserWithRelevanceOutput(users, currentUser.tg_id);
      res.status(HttpStatus.Ok).send(usersOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async getUserRelevanceHandler(
    req: Request<{}, {}, { tg_id: string, user_tg_id: string }>,
    res: Response,
  ) {
    try {
      const tgId = req.body.tg_id;
      const userTgId = req.body.user_tg_id;
      const relevance = await this.userService.getRelevance(tgId, userTgId);
      console.log('getUserHandler tgId', tgId);
      const output = { success: true, message: '', data: relevance };
      res.status(HttpStatus.Ok).send(output);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async updateUser(
    req: Request<{}, {}, UserUpdateInput>,
    res: Response,
  ) {
    try {
      const tgId = req.body;
      await this.userService.userUpdate(req.body);
      console.log('getUserHandler tgId', tgId);
      const output = { success: true, message: '' };
      res.status(HttpStatus.Ok).send(output);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async deleteUserHandler(
    req: Request<{ id: string }>,
    res: Response,
  ) {
    try {
      const id = req.params.id;

      await this.userService.delete(id);
      // Отправка статуса 204 (No Content) без тела ответа
      res.status(HttpStatus.NoContent).send('No Content');
    } catch (e) {
      errorsHandler(e, res);
    }
  }

}
