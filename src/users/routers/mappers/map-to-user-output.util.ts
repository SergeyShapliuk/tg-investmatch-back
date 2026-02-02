import { WithId } from 'mongodb';
import { User } from '../../domain/user.model';
import { UserDataOutput } from '../output/user-data.output';
import { UserOutput } from '../output/user.output';
<<<<<<< HEAD


export function mapToUserOutputUtil(user: WithId<User> | null): UserDataOutput {
  const userOutput: UserOutput | null = user && {
    id: user._id.toString(),
    tg_id: user.tg_id,
    tg_firstname: user.tg_firstname,
    tg_lastname: user.tg_lastname,
    tg_nick: user.tg_nick,
    tg_language: user.tg_language,
    created_at: user.created_at?.toString() || new Date().toISOString(), // Преобразуем Date в string
    updated_at: user.updated_at?.toString() || new Date().toISOString(), // Преобразуем Date в string
    user_types: user.user_types || [],
    industries: user.industries || [],
    business_models: user.business_models || [],
    project_stages: user.project_stages || [],
    geography: user.geography || [],
    name: user.name || user.tg_firstname,
    wallet: user.wallet || '',
    description: user.description || '',
    photos: user.photos || [],
    donuts: {
      currency: user.donuts?.currency || '',
      // Преобразуем string в number если нужно
      current_amount: user.donuts?.current_amount || '0',
      purpose_amount: user.donuts?.purpose_amount || '0',
    },
    hashtags: user.hashtags || {},
  };
  return {
    success: !!user,
    message: !user ? 'User not exist' : '',
    user: user ? userOutput : null,
=======
import { UserTimerDataOutput } from '../output/user-timer-data.output';
import { UserTimerOutput } from '../output/user.timer.output';


export function mapToUserOutputUtil(user: WithId<User> | null): UserTimerDataOutput {
  const nowSec = Math.floor(Date.now() / 1000);

  const go = Math.max(0, nowSec - (user?.time_start || 0));
  const last = Math.max(0, (user?.time_end || 0) - nowSec);

  const userTimerOutput: UserTimerOutput = {
      amount: user?.amount ?? 0,
      customer_id: Number(user?.tg_id) ?? 0,
      dt_create: user?.created_at ?? '',
      id: Number(user?.tg_id) ?? 0,
      stat: Number(user?.updated_at) ?? 0,
      time_end: user?.time_end ?? 0,
      time_start: user?.time_start ?? 0,
    }
  ;
  return {
    resp: 'ok',
    second: { go, last },
    info: userTimerOutput,
>>>>>>> origin/main
  };
}
