import express, { Express } from 'express';
import { HttpStatus } from './core/types/http-ststuses';
// import { setupSwagger } from './core/swagger/setup-swagger';
import {
  INTERACTION_PATH,
  SECURITY_PATH, STATICS_PATH,
  TESTING_PATH, USERS_PATH,
} from './core/paths/paths';
import { testingRouter } from './testing/routers/testing.router';
import { usersRouter } from './users/routers/users.router';
// import { authRouter } from './auth/routers/auth.router';
import { securityRouter } from './securityDevices/routers/security.router';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import { staticsRouter } from './statics/routers/statics.router';
import { interactionRouter } from './interaction/routers/interaction.routers';


export const setupApp = (app: Express) => {
  // app.use(cookieParser());
  // app.set('trust proxy', true);

  app.use(cors());
  app.use(express.json()); // middleware для парсинга JSON в теле запроса


  app.use(USERS_PATH, usersRouter); // Подключаем роутеры
  app.use(INTERACTION_PATH, interactionRouter); // Подключаем роутеры
  app.use(STATICS_PATH, staticsRouter); // Подключаем роутеры
  // app.use(AUTH_PATH, authRouter); // Подключаем роутеры
  app.use(SECURITY_PATH, securityRouter); // Подключаем роутеры
  app.use(TESTING_PATH, testingRouter); // Подключаем тестовый роутер

  app.get('/', (req, res) => {
    res.status(HttpStatus.Ok).send('Investmatch');
  });
  app.get('/healthz', (req, res) => {
    res.status(HttpStatus.Ok).send('Investmatch health');
  });

  // setupSwagger(app);

  return app;
};
