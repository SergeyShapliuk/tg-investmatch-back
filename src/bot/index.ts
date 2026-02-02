import { Bot } from 'grammy';
import { maskToken } from './utils';
import {
  setupBotCommands,
  setupErrorHandlers,
  createLoggingMiddleware,
} from './core';
import { BotInstance, BotState, getBotConfig } from './types';

const createBot = (customToken?: string): BotInstance => {
  const config = getBotConfig();
  console.log('🤖 getBotConfig:', config);
  // Используем кастомный токен если передан
  if (customToken) {
    config.token = customToken;
  }

  // Логируем токен (маскированный) в development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🤖 Creating bot with token: ${maskToken(config.token)}`);
  }

  // Создаем экземпляр бота
  const bot = new Bot(config.token);

  // Состояние бота
  const state: BotState = {
    isRunning: false,
    botInfo: null,
    startTime: null,
  };

  // Настраиваем бота
  bot.use(createLoggingMiddleware());
  setupBotCommands(bot, config);
  setupErrorHandlers(bot);

  // Функция запуска бота
  const startBot = async (): Promise<void> => {
    if (state.isRunning) {
      console.warn('Bot is already running');
      return;
    }

    try {
      console.log('🚀 Starting bot...');

      // Получаем информацию о боте
      state.botInfo = await bot.api.getMe();
      console.log(`✅ Bot @${state.botInfo.username} authenticated`);

      // Запускаем бота
      bot.start({
        drop_pending_updates: process.env.NODE_ENV === 'production',
        allowed_updates: ['message', 'callback_query'],
      });

      state.isRunning = true;
      state.startTime = new Date();
      console.log('✅ Bot started successfully');
    } catch (error) {
      console.error('❌ Failed to start bot:', error);
      throw error;
    }
  };

  // Функция остановки бота
  const stopBot = async (): Promise<void> => {
    if (!state.isRunning) return;

    try {
      console.log('🛑 Stopping bot...');
      await bot.stop();
      state.isRunning = false;
      console.log('✅ Bot stopped gracefully');
    } catch (error) {
      console.error('❌ Error stopping bot:', error);
      throw error;
    }
  };

  // Функция получения статуса
  const getStatus = (): BotState => ({ ...state });

  return {
    bot,
    state,
    config,
    startBot,
    stopBot,
    getStatus,
  };
};

export default createBot;
// Экспорт для обратной совместимости
// export { getBotConfig };
// export type { BotConfig, BotInstance };
