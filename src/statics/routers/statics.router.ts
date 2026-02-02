import { Router } from 'express';
import { idValidation, tgIdValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { UserSortField } from './input/user-sort-field';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation-middleware';
import { container } from '../../composition-root';
import { StaticsController } from './controllers/static.controller/staticsController';

export const staticsRouter = Router({});

const staticsController = container.get<StaticsController>(StaticsController);

// usersRouter.use(superAdminGuardMiddleware);

staticsRouter
  .get(
    '/form',
    inputValidationResultMiddleware,
    staticsController.getUserForm.bind(staticsController),
  )

  .get(
    '/currencies',
    inputValidationResultMiddleware,
    staticsController.getUserCurrencies.bind(staticsController),
  );


// .post(
//   '',
//   userCreateInputValidation,
//   inputValidationResultMiddleware,
//   usersController.createUserHandler.bind(usersController),
// )
//
// .delete(
//   '/:id',
//   idValidation,
//   inputValidationResultMiddleware,
//   usersController.deleteUserHandler.bind(usersController),
// );
