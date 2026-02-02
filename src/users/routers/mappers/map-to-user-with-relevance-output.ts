import { User } from '../../domain/user.model';
import { UserDataWithRelevanceOutput } from '../output/user-data-with-relevance.output';
import { WithId } from 'mongodb';

export function mapToUserWithRelevanceOutput(
  users: WithId<User>[],
  currentUserTgId: string,
): UserDataWithRelevanceOutput {
  // Находим текущего пользователя
  const currentUser = users.find(u => u.tg_id === currentUserTgId);
  if (!currentUser) {
    return { success: false, message: 'User not found', feed: [] };
  }

  // Логируем данные текущего пользователя для отладки
  // console.log('DEBUG - Current user data:', {
  //   tg_id: currentUser.tg_id,
  //   user_type: currentUser.user_type,
  //   user_types: currentUser.user_types,
  //   name: currentUser.name
  // });

  // Определяем тип текущего пользователя
  // Приоритет: user_types[0] > user_type
  const currentUserType = currentUser.user_types?.[0]?.toLowerCase()
    || currentUser.user_type?.toLowerCase()
    || 'unknown';

  // Определяем кого ищем (противоположный тип)
  const targetType = currentUserType.includes('founder') ? 'investor' : 'founder';

  // console.log(`DEBUG - Current user type: "${currentUserType}", Looking for: "${targetType}"`);

  // Поля для сравнения relevance
  const compareFields: (keyof User)[] = ['industries', 'business_models', 'project_stages', 'geography'];

  // Фильтруем и вычисляем relevance
  const feed = users
    .filter(u => {
      // Исключаем себя
      if (u.tg_id === currentUser.tg_id) return false;

      // Определяем тип другого пользователя
      const otherType = u.user_types?.[0]?.toLowerCase()
        || u.user_type?.toLowerCase()
        || '';

      // console.log(`DEBUG - User ${u.tg_id} type: "${otherType}", matches target? ${otherType.includes(targetType)}`);

      // Проверяем совпадение типа
      return otherType.includes(targetType);
    })
    .map(user => {
      let total = 0;
      let matched = 0;

      // Вычисляем relevance на основе совпадений полей
      for (const field of compareFields) {
        const currentValues = (currentUser[field] || []) as string[];
        const otherValues = (user[field] || []) as string[];

        // Учитываем только если у текущего пользователя есть значения
        if (currentValues.length > 0) {
          total += currentValues.length;
          matched += currentValues.filter(v => otherValues.includes(v)).length;
        } else {
          // Если у текущего пользователя нет значений в этом поле, пропускаем
          total += 0; // Не учитываем в расчете
        }
      }

      // Расчет relevance (0-100)
      const relevance = total > 0 ? Math.round((matched / total) * 100) : 0;

      // console.log(`DEBUG - User ${user.tg_id} relevance: ${relevance}% (matched: ${matched}, total: ${total})`);

      return {
        relevance,
        user: {
          id: user._id.toString(),
          tg_id: user.tg_id,
          tg_firstname: user.tg_firstname,
          tg_lastname: user.tg_lastname,
          tg_nick: user.tg_nick,
          tg_language: user.tg_language,
          created_at: user.created_at?.toString() || new Date().toISOString(),
          updated_at: user.updated_at?.toString() || new Date().toISOString(),
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
            current_amount: user.donuts?.current_amount || '0',
            purpose_amount: user.donuts?.purpose_amount || '0',
          },
          hashtags: user.hashtags || {},
        },
      };
    })
    .sort((a, b) => b.relevance - a.relevance); // Сортировка по убыванию relevance

  // console.log(`DEBUG - Found ${feed.length} users for ${targetType}`);

  return {
    success: true,
    message: feed.length > 0 ? '' : `No ${targetType}s found in the list`,
    feed
  };
}
