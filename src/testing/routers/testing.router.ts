import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../core/types/http-ststuses';
import {
<<<<<<< HEAD
  staticsCurrencyCollection,
  staticsFormCollection,
=======
  tasksCollection,
>>>>>>> origin/main
  userCollection,
} from '../../db/db';

export const testingRouter = Router({});

// testingRouter.delete('/all-data', (req, res) => {
//   db.videos = [];
//   // Отправка статуса
//   res.sendStatus(HttpStatus.NoContent);
// });

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  //truncate db
<<<<<<< HEAD
  await Promise.all([userCollection.deleteMany(), staticsFormCollection.deleteMany(), staticsCurrencyCollection.deleteMany()]);
=======
  await Promise.all([userCollection.deleteMany(), tasksCollection.deleteMany(),tasksCollection.drop()]);
>>>>>>> origin/main
  res.sendStatus(HttpStatus.NoContent);
});
