import { WithId } from 'mongodb';
import { User } from '../../domain/user.model';
import { UserOutput } from '../output/user.output';
import { UserDataWithRelevanceOutput } from '../output/user-data-with-relevance.output';
import { UserDataListOutput } from '../output/user-data-list.output';


export function mapToUserListOutput(users: WithId<User>[]): UserDataListOutput {


  const usersOutput: UserOutput [] = users.map(user => ({
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
  }));

  return {
    success: true,
    message: '',
    users: usersOutput,
  };
}
