// import express from 'express';
// import { setupApp } from './setup-app';
// import { SETTINGS } from './core/settings/settings';
// import { runDB } from './db/db';
import dotenv from 'dotenv';
import startServer from './app';
// import lt from 'localtunnel';


dotenv.config();

// Проверка переменных окружения
const checkEnv = () => {
  const required = ['NODE_ENV'];

  if (process.env.NODE_ENV === 'production') {
    required.push('TOKEN_BOT_PROD', 'MONGO_URL');
  } else if (process.env.NODE_ENV === 'development') {
    required.push('TOKEN_BOT_DEV', 'MONGO_URL');
  }

  for (const envVar of required) {
    if (!process.env[envVar]) {
      console.error(`❌ Missing: ${envVar}`);
      process.exit(1);
    }
  }
};

// Запуск
checkEnv();
startServer().catch((error) => {
  console.error('💥 Application crashed:', error);
  process.exit(1);
});
//
// const token = process.env.NODE_ENV === 'development' ? process.env.TOKEN_BOT_DEV : process.env.TOKEN_BOT_PROD;
// if (!token) {
//   throw new Error('TOKEN_BOT_DEV не найден в .env файле');
// }
// console.log('🔄 Connecting token...',token);
//
// export const bot = createBot(token);
//
//
// let isInitialized = false;
// let appInstance: express.Application;
//
// const initApp = async () => {
//   if (isInitialized) return appInstance;
//
//   const app = express();
//   setupApp(app);
//
//   console.log('🔄 Connecting to database...',SETTINGS.MONGO_URL);
//   await runDB(SETTINGS.MONGO_URL);
//   await autoSeedForms();
//   await autoSeedCurrencies();
//   await bot.start();
//   console.log('✅ Bot start');
//   console.log('✅ Database connected');
//
//   appInstance = app;
//   isInitialized = true;
//
//   // ✅ ВАЖНО: На Render используем порт из process.env.PORT
//   const PORT = process.env.PORT || SETTINGS.PORT;
//   const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
//
//   // ✅ Обязательно указываем '0.0.0.0' для Render
//   // if (process.env.NODE_ENV === 'production') {
//   // Для Render: слушаем на 0.0.0.0
//   app.listen(Number(PORT), HOST, () => {
//     console.log(`🚀 Сервер запущен на ${HOST}:${PORT}`);
//   });
//   // } else {
//   //   // ✅ Сначала запускаем сервер
//   //   app.listen(Number(PORT), () => {
//   //     console.log(`🚀 Development server listening on port ${PORT}`);
//
//   // ✅ Потом запускаем тунель (после старта сервера)
//   // lt({ port: Number(PORT) }).then(tunnel => {
//   //     console.log(`🌐 External URL: ${tunnel.url}`);
//   // }).catch(error => {
//   //     console.log('Tunnel failed:', error.message);
//   // });
//   // });
//   // try {
//   //     const tunnelUrl = await TunnelService.start(5001);
//   //     console.log(`🌐 External HTTPS URL: ${tunnelUrl}`);
//   // } catch (error) {
//   //     console.log('Ngrok not available, using localhost only');
//   // }
//   // Для локальной разработки: без указания host
//   // app.listen(Number(PORT), () => {
//   //     console.log(`🚀 Development server listening on port ${PORT}`);
//   // });
//   // }
//   process.on('SIGTERM', () => {
//     console.log('Закрываемся...');
//     bot.stop();
//     process.exit(0);
//   });
//
//   return appInstance;
// };
// initApp().catch(error => {
//   console.error('Ошибка запуска:', error);
//   process.exit(1);
// });
// // ✅ Экспортируем инициализированное приложение
// export default initApp;
//
//
//
