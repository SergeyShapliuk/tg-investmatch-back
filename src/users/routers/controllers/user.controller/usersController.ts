import { inject, injectable } from 'inversify';
import { UserService } from '../../../application/user.service';
import { Request, Response } from 'express';
<<<<<<< HEAD
import { HttpStatus } from '../../../../core/types/http-ststuses';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { UserCreateInput } from '../../input/user-create.input';
import { mapToUserOutputUtil } from '../../mappers/map-to-user-output.util';
import { mapToUserWithRelevanceOutput } from '../../mappers/map-to-user-with-relevance-output';
import { UserUpdateInput } from '../../input/user-update.input';

=======
import { UserQueryInput } from '../../input/user-query.input';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../../core/helpers/set-default-sort-and-pagination';
import { mapToUserListPaginatedOutput } from '../../mappers/map-to-user-list-paginated-output.util';
import { HttpStatus } from '../../../../core/types/http-ststuses';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { UserCreateInput } from '../../input/user-create.input';
import { mapToUserTimerOutputUtil } from '../../mappers/map-to-user-timer-output.util';
import { mapToUserBalanceOutputUtil } from '../../mappers/map-to-user-balance-output.util';
import { mapToUserOutputUtil } from '../../mappers/map-to-user-output.util';
>>>>>>> origin/main

@injectable()
export class UsersController {
  constructor(
    @inject(UserService) private userService: UserService,
  ) {
  }

<<<<<<< HEAD
=======
  async getUserBalanceHandler(
    req: Request<{ telegram_id: string }>,
    res: Response,
  ) {
    try {

      const tgId = req.params.telegram_id;
      const user = await this.userService.findByTgId(tgId);
      console.log('getUserHandler tgId', tgId);
      const userOutput = mapToUserBalanceOutputUtil(user);
      res.status(HttpStatus.Ok).send(userOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async getUserTimerHandler(
    req: Request<{ telegram_id: string }>,
    res: Response,
  ) {
    try {

      const tgId = req.params.telegram_id;
      const user = await this.userService.findByTgId(tgId);
      console.log('getUserTimerHandler tgId', tgId);
      console.log('getUserTimerHandler', user);
      const userOutput = mapToUserTimerOutputUtil(user);
      res.status(HttpStatus.Ok).send(userOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

>>>>>>> origin/main
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

<<<<<<< HEAD
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
=======
  async startTimerHandler(
    req: Request<{}, {}, { telegram_id: string }>,
    res: Response,
  ) {
    try {
      const tg_id = req.body.telegram_id;
      const user = await this.userService.createTimer(tg_id);
      if (!user) {
        res.status(HttpStatus.Created).send({ resp: 'err', message: 'Timer already running' });
        return;
      }
      const timerOutput = mapToUserTimerOutputUtil(user);
      res.status(HttpStatus.Created).send(timerOutput);
>>>>>>> origin/main
    } catch (e) {
      errorsHandler(e, res);
    }
  }

<<<<<<< HEAD
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
=======
  async stopTimerHandler(
    req: Request<{}, {}, { telegram_id: string }>,
    res: Response,
  ) {
    try {
      const tg_id = req.body.telegram_id;
      const user = await this.userService.stopTimer(tg_id);
      if (!user) {
        res.status(HttpStatus.Created).send({ resp: 'err', message: 'Timer already running' });
        return;
      }
      res.status(HttpStatus.Created).send({
        resp: 'ok', info: {
          amount: user.amount,
          customer_id: user.tg_id,
          dt_create: user.created_at,
          id: user._id.toString(),
        },
      });
>>>>>>> origin/main
    } catch (e) {
      errorsHandler(e, res);
    }
  }

<<<<<<< HEAD
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
=======
  // async createUserHandler(
  //   req: Request<{}, {}, UserCreateInput>,
  //   res: Response,
  // ) {
  //   try {
  //     const createdUserId = await this.userService.create(req.body);
  //
  //     const createdUser = await this.userService.findByIdOrFail(createdUserId);
  //
  //     const userOutput = mapToUserOutputUtil(createdUser);
  //     res.status(HttpStatus.Created).send(userOutput);
  //   } catch (e) {
  //     errorsHandler(e, res);
  //   }
  // }

  // async deleteUserHandler(
  //   req: Request<{ id: string }>,
  //   res: Response,
  // ) {
  //   try {
  //     const id = req.params.id;
  //
  //     await this.userService.delete(id);
  //     // Отправка статуса 204 (No Content) без тела ответа
  //     res.status(HttpStatus.NoContent).send('No Content');
  //   } catch (e) {
  //     errorsHandler(e, res);
  //   }
  // }
>>>>>>> origin/main

}
