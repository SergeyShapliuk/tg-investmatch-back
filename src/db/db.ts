import { Collection, Db, MongoClient } from 'mongodb';

import { SETTINGS } from '../core/settings/settings';
import { User } from '../users/domain/user.model';
<<<<<<< HEAD
import { BlacklistedToken, ensureTTLIndex } from '../auth/routers/guard/refreshTokenBlacklistService';
import { SessionDevice } from '../securityDevices/domain/sessionDevice';
import * as mongoose from 'mongoose';
import { Form } from '../statics/domain/static.form.model';
import { Currency } from '../statics/domain/static.currency.model';
import { Interaction } from '../interaction/domain/interaction.model';

// const VIDEOS_COLLECTION_NAME = "videos";
const BLOGS_COLLECTION_NAME = 'blogs';
export const POSTS_COLLECTION_NAME = 'posts';
export const USERS_COLLECTION_NAME = 'users';
const TOKEN_BLACKLIST_COLLECTION = 'tokenBlacklist';
const DEVICES_COLLECTION_NAME = 'devices';
export const COMMENTS_COLLECTION_NAME = 'comments';
export const COMMENT_LIKE_COLLECTION_NAME = 'commentLike';
export const INTERACTION_COLLECTION_NAME = 'interaction';
export const STATICS_FORM_COLLECTION_NAME = 'forms';
export const STATICS_CURRENCY_COLLECTION_NAME = 'currencies';
=======
import * as mongoose from 'mongoose';
import { Task } from '../tasks/application/dtos/task.attributes';

export const USERS_COLLECTION_NAME = 'users';
export const TASKS_COLLECTION_NAME = 'tasks';

>>>>>>> origin/main

export let client: MongoClient;
// export let videoCollection: Collection<Video>;
export let userCollection: Collection<User>;
<<<<<<< HEAD
export let tokenBlacklistCollection: Collection<BlacklistedToken>;
export let devicesCollection: Collection<SessionDevice>;
export let commentCollection: Collection<Comment>;
export let interactionCollection: Collection<Interaction>;
export let staticsFormCollection: Collection<Form>;
export let staticsCurrencyCollection: Collection<Currency>;
=======
// export let tokenBlacklistCollection: Collection<BlacklistedToken>;
export let tasksCollection: Collection<Task>;
>>>>>>> origin/main


// Подключения к бд
export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  // Инициализация коллекций
  // videoCollection = db.collection<Video>(VIDEOS_COLLECTION_NAME);
  userCollection = db.collection<User>(USERS_COLLECTION_NAME);
<<<<<<< HEAD
  tokenBlacklistCollection = db.collection<BlacklistedToken>(TOKEN_BLACKLIST_COLLECTION);
  devicesCollection = db.collection<SessionDevice>(DEVICES_COLLECTION_NAME);
  commentCollection = db.collection<Comment>(COMMENTS_COLLECTION_NAME);
  interactionCollection = db.collection<Interaction>(INTERACTION_COLLECTION_NAME);
  staticsFormCollection = db.collection<Form>(STATICS_FORM_COLLECTION_NAME);
  staticsCurrencyCollection = db.collection<Currency>(STATICS_CURRENCY_COLLECTION_NAME);
=======
  tasksCollection = db.collection<Task>(TASKS_COLLECTION_NAME);
>>>>>>> origin/main
  // await ensureTTLIndex();
  // await ensureDevicesTTLIndex();
  // await postLikeCollection.dropIndex("userId_1_commentId_1")

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✅ Connected to the database');
    await mongoose.connect(url);
    console.log('✅ Connected to the mongoose');
  } catch (e) {
    await client.close();
    await mongoose.disconnect();
    throw new Error(`❌ Database not connected: ${e}`);
  }
}

<<<<<<< HEAD
// TTL индекс для автоматической очистки устаревших устройств
async function ensureDevicesTTLIndex() {
  try {
    await devicesCollection.createIndex(
      { 'expiresAt': 1 },
      { expireAfterSeconds: 0 }, // удалять когда expiresAt прошло
    );
    console.log('✅ Devices TTL index created');
  } catch (error) {
    console.error('❌ Error creating devices TTL index:', error);
  }
}
=======
>>>>>>> origin/main

// для тестов
export async function stopDb() {
  if (!client) {
    throw new Error(`❌ No active client`);
  }
  await client.close();
}

