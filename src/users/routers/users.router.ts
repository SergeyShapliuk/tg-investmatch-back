import { Router } from 'express';
<<<<<<< HEAD
import { idValidation, tgIdValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
=======
import {
  idValidation,
  tgIdValidation,
  tgIdValidationBody,
} from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
>>>>>>> origin/main
import { UserSortField } from './input/user-sort-field';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation-middleware';
import { userCreateInputValidation } from './user.input-dto.validation-middlewares';
import { container } from '../../composition-root';
import { UsersController } from './controllers/user.controller/usersController';
import { body } from 'express-validator';

export const usersRouter = Router({});

const usersController = container.get<UsersController>(UsersController);

<<<<<<< HEAD
// usersRouter.use(superAdminGuardMiddleware);

usersRouter
=======
// timersRouter.use(superAdminGuardMiddleware);

usersRouter

  .get(
    '/get-user-balance/:telegram_id',
    tgIdValidation,
    inputValidationResultMiddleware,
    usersController.getUserBalanceHandler.bind(usersController),
  )

  .get(
    '/get-user-timer/:telegram_id',
    tgIdValidation,
    inputValidationResultMiddleware,
    usersController.getUserTimerHandler.bind(usersController),
  )

>>>>>>> origin/main
  .get(
    '/:telegram_id',
    tgIdValidation,
    inputValidationResultMiddleware,
    usersController.getUserHandler.bind(usersController),
  )

  .post(
<<<<<<< HEAD
    '/registration',
    // userCreateInputValidation,
    body().isObject().withMessage('Is not data'),
    inputValidationResultMiddleware,
    usersController.createUserHandler.bind(usersController),
  )

  .post(
    '/getListOfUsersWithRelevance',
    // userCreateInputValidation,
    body().isObject().withMessage('Is not data'),
    inputValidationResultMiddleware,
    usersController.getUserListRelevanceHandler.bind(usersController),
  )

  .post(
    '/getUserRelevance',
    // userCreateInputValidation,
    body().isObject().withMessage('Is not data'),
    inputValidationResultMiddleware,
    usersController.getUserRelevanceHandler.bind(usersController),
  )

  .put(
    '/updateUser',
    // body().isObject().withMessage('Is not data'),
    inputValidationResultMiddleware,
    usersController.updateUser.bind(usersController),
  )

  .delete(
    '/:id',
    idValidation,
    inputValidationResultMiddleware,
    usersController.deleteUserHandler.bind(usersController),
  );
=======
    '/start-user-timer',
    tgIdValidationBody,
    inputValidationResultMiddleware,
    usersController.startTimerHandler.bind(usersController),
  )

  .post(
    '/close-user-timer',
    tgIdValidationBody,
    inputValidationResultMiddleware,
    usersController.stopTimerHandler.bind(usersController),
  )

  // .post(
  //   '/registration',
  //   // userCreateInputValidation,
  //   body().isObject().withMessage('Is not data'),
  //   inputValidationResultMiddleware,
  //   usersController.createUserHandler.bind(usersController),
  // )

  // .delete(
  //   '/:id',
  //   idValidation,
  //   inputValidationResultMiddleware,
  //   usersController.deleteUserHandler.bind(usersController),
  // );
>>>>>>> origin/main
