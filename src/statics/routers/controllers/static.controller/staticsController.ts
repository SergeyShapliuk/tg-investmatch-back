import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../../core/types/http-ststuses';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { mapToStaticFormOutputUtil } from '../../mappers/map-to-static-form-output.util';
import { StaticService } from '../../../application/static.service';
import { mapToStaticCurrenciesOutputUtil } from '../../mappers/map-to-static-currency-output.util';

@injectable()
export class StaticsController {
  constructor(
    @inject(StaticService) private staticService: StaticService,
  ) {
  }

  async getUserForm(
    req: Request,
    res: Response,
  ) {
    try {
      // const tgId = req.params.telegram_id;
      const form = await this.staticService.findManyForms();
      // console.log('getUserHandler tgId', tgId);
      const staticOutput = mapToStaticFormOutputUtil(form);
      res.status(HttpStatus.Ok).send(staticOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async getUserCurrencies(
    req: Request,
    res: Response,
  ) {
    try {
      // const tgId = req.params.telegram_id;
      const form = await this.staticService.findManyCurrencies();
      // console.log('getUserHandler tgId', tgId);
      const staticOutput = mapToStaticCurrenciesOutputUtil(form);
      res.status(HttpStatus.Ok).send(staticOutput);
    } catch (e) {
      errorsHandler(e, res);
    }
  }


  // async createUserHandler(
  //   req: Request<{}, {}, UserCreateInput>,
  //   res: Response,
  // ) {
  //   try {
  //     const createdUserId = await this.userService.create(req.body);
  //
  //     const createdUser = await this.userService.findByIdOrFail(createdUserId);
  //
  //     const postOutput = mapToStaticOutputUtil(createdUser);
  //     res.status(HttpStatus.Created).send(postOutput);
  //   } catch (e) {
  //     errorsHandler(e, res);
  //   }
  // }
  //
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

}
