import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { LikeRepository } from '../repositories/like.repository';
import { Interaction, InteractionDocument } from '../domain/interaction.model';
import { User } from '../../users/domain/user.model';


@injectable()
export class LikeService {
  constructor(
    // @inject(MatchRepository) private matchRepository: MatchRepository,
    @inject(LikeRepository) private likeRepository: LikeRepository,
  ) {
  }

  async getLikes(
    tgId: string,
  ): Promise<User[]> {
    return this.likeRepository.getMyLikes(tgId);
  }

  async getMatches(
    tgId: string,
  ): Promise<User[]> {
    return this.likeRepository.getMyMatches(tgId);
  }

  async like(
    fromTgId: string,
    toTgId: string,
  ): Promise<boolean> {
    return this.likeRepository.create(fromTgId, toTgId, 'like');
  }

  async dislike(
    fromTgId: string,
    toTgId: string,
  ): Promise<boolean> {
    return this.likeRepository.create(fromTgId, toTgId, 'dislike');
  }

  getMatchedTgId(
    match: any,
    myTgId: string,
  ): string {
    return match.from_user_tg_id === myTgId
      ? match.to_user_tg_id
      : match.from_user_tg_id;
  }

}
