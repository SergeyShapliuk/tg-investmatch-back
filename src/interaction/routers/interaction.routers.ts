import { Router } from 'express';
import { idValidation, tgIdValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { body } from 'express-validator';
import { container } from '../../composition-root';
import { InteractionController } from './controllers/interactionСontroller/interactionController';
import { likeInputDtoValidation } from './validation/like.input.validation';

export const interactionRouter = Router({});

const interactionController = container.get<InteractionController>(InteractionController);

// usersRouter.use(superAdminGuardMiddleware);

interactionRouter
  .get(
    '/getLikes/:telegram_id',
    tgIdValidation,
    inputValidationResultMiddleware,
    interactionController.getLikes.bind(interactionController),
  )

  .get(
    '/getMatches/:telegram_id',
    tgIdValidation,
    inputValidationResultMiddleware,
    interactionController.getMatches.bind(interactionController),
  )


  .post(
    '/setLike',
    likeInputDtoValidation,
    inputValidationResultMiddleware,
    interactionController.setLike.bind(interactionController),
  )

  .post(
    '/setDislike',
    likeInputDtoValidation,
    inputValidationResultMiddleware,
    interactionController.setDislike.bind(interactionController),
  );
// .post(
//   '/getUserRelevance',
//   // userCreateInputValidation,
//   body().isObject().withMessage('Is not data'),
//   inputValidationResultMiddleware,
//   usersController.getUserRelevanceHandler.bind(usersController),
// )
//
// .delete(
//   '/:id',
//   idValidation,
//   inputValidationResultMiddleware,
//   usersController.deleteUserHandler.bind(usersController),
// );
