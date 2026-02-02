import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import { runDB } from './db/db';
import dotenv from 'dotenv';
import { autoSeedCurrencies, autoSeedForms } from './statics/seed/auto.seed.statics';
import createBot from './bot';


dotenv.config();

/**
 * Запускает сидинг данных
 */
const seedData = async () => {
  const tasks = [
    { name: 'Forms', task: autoSeedForms },
    { name: 'Currencies', task: autoSeedCurrencies },
  ];

  for (const { name, task } of tasks) {
    try {
      console.log(`🌱 Seeding ${name}...`);
      await task();
      console.log(`✅ ${name} seeded`);
    } catch (error) {
      console.warn(`⚠️ ${name} seeding failed:`, error instanceof Error ? error.message : String(error));
    }
  }
};

/**
 * Инициализация приложения
 */
export const initializeApp = async () => {
  console.log('🚀 Starting application initialization...');

  // 1. Создаем бота
  const botInstance = createBot();

  // 2. Настраиваем Express
  const app = express();
  setupApp(app);

  // 3. Подключаем базу данных
  console.log(`🔄 Connecting to database: ${SETTINGS.MONGO_URL}`);
  await runDB(SETTINGS.MONGO_URL);
  console.log('✅ Database connected');

  // 4. Сидинг данных
  console.log('🌱 Seeding initial data...');
  await seedData();
  console.log('✅ Data seeding completed');

  return { app, botInstance };
};

/**
 * Запуск сервера
 */
const startServer = async () => {
  try {
    const { app, botInstance } = await initializeApp();

    // // Запускаем бота
    // await botInstance.startBot();

    // Запускаем сервер
    const PORT = process.env.PORT || SETTINGS.PORT;
    const HOST = getHost();

    app.listen(Number(PORT), HOST, async () => {
      console.log(`🚀 Server running on ${HOST}:${PORT}`);
      console.log(`🤖 Bot: @${botInstance.state.botInfo?.username || 'unknown'}`);
      // ПОТОМ запускаем бота
      console.log('🤖 Starting bot...');
      try {
        await botInstance.startBot();
        console.log(`✅ Bot @${botInstance.state.botInfo?.username} is running`);
      } catch (error) {
        console.error('❌ Failed to start bot:', error);
      }
    });


    // Настраиваем graceful shutdown
    setupGracefulShutdown(botInstance);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Определяем хост
 */
const getHost = (): string => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'production' ? '0.0.0.0' : 'localhost';
};

/**
 * Настройка graceful shutdown
 */
const setupGracefulShutdown = (
  botInstance: ReturnType<typeof createBot>,
) => {
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down...`);

    try {
      // Останавливаем бота
      if (botInstance.state.isRunning) {
        await botInstance.stopBot();
      }

      console.log('✅ Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Для nodemon
  process.on('SIGUSR2', () => {
    console.log('SIGUSR2 received (nodemon restart)');
    shutdown('SIGUSR2');
  });
};

// Автозапуск если файл запущен напрямую
if (require.main === module) {
  startServer();
}

export default startServer;
