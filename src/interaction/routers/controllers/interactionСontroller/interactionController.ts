import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../../core/types/http-ststuses';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { LikeInput } from '../../../input/like.input';
import { LikeService } from '../../../application/like.service';
import { mapToUserOutputUtil } from '../../../../users/routers/mappers/map-to-user-output.util';
import { mapToUserListOutput } from '../../../../users/routers/mappers/map-to-user-list-output';
import { WithId } from 'mongodb';
import { User } from '../../../../users/domain/user.model';

@injectable()
export class InteractionController {
  constructor(
    @inject(LikeService) private likeService: LikeService,
  ) {
  }

  async getLikes(
    req: Request<{ telegram_id: string }>,
    res: Response,
  ) {
    try {
      const { telegram_id } = req.params;
      const users = await this.likeService.getLikes(telegram_id);

      const output = mapToUserListOutput(users as WithId<User>[])
      res.status(HttpStatus.Ok).send(output);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async getMatches(
    req: Request<{ telegram_id: string }>,
    res: Response,
  ) {
    try {
      const { telegram_id } = req.params;
      const users = await this.likeService.getMatches(telegram_id);

      const output = mapToUserListOutput(users as WithId<User>[])
      res.status(HttpStatus.Ok).send(output);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async setLike(
    req: Request<{}, {}, LikeInput>,
    res: Response,
  ) {
    try {
      const { tg_id, tg_id_what_i_liked } = req.body;
      console.log('req.body', tg_id, tg_id_what_i_liked);
      const match = await this.likeService.like(tg_id, tg_id_what_i_liked);

      const output = {
        success: true,
        message: '',
        match,
      };
      res.status(HttpStatus.Created).send(output);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  async setDislike(
    req: Request<{}, {}, LikeInput>,
    res: Response,
  ) {
    try {
      const { tg_id, tg_id_what_i_liked } = req.body;
      const match = await this.likeService.dislike(tg_id, tg_id_what_i_liked);

      const output = {
        success: true,
        message: '',
        match,
      };
      res.status(HttpStatus.Created).send(output);
    } catch (e) {
      errorsHandler(e, res);
    }
  }

  // // Получить мои мэтчи
  // async getMatches(req: Request, res: Response) {
  //   try {
  //     const userId = req.user._id;
  //     const matches = await this.matchService.getUserMatches(userId);
  //
  //     res.json({
  //       success: true,
  //       count: matches.length,
  //       matches,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }
  //
  // // Получить кто меня лайкнул
  // async getLikesReceived(req: Request, res: Response) {
  //   try {
  //     const userId = req.user._id;
  //     const likes = await this.matchService.getReceivedLikes(userId);
  //
  //     res.json({
  //       success: true,
  //       count: likes.length,
  //       likes,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }
}
