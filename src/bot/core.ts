import { Bot, InputFile } from 'grammy';
import fs from 'fs';
import path from 'path';
import { checkFileExists, getFileSize, isAllowedImage, maskToken } from './utils';
import { BotConfig } from './types';


/**
 * Создает приветственное сообщение
 */
export const createWelcomeMessage = (): string => {
  return `<b>🚀 Welcome to InvestMatch!</b>\n\n` +
    `We help <i>founders and investors</i> find each other:\n\n` +
    `✨ <b>For Founders</b> ✨\n` +
    `• Automatic matching by industry, stage, and funding amount\n` +
    `• Built-in chat with templates and secure document exchange\n` +
    `• Dashboard with profile views, responses, and improvement tips\n\n` +
    `💼 <b>For Investors</b> 💼\n` +
    `• Filters by sector, stage, and region\n` +
    `• Daily startup digests with scoring and KPI summaries\n` +
    `• Secure file sharing and real-time alerts\n\n` +
    `🏆 <i>Trusted by 115+ founders, 35 angels, and 2 accelerators</i>\n` +
    `🌍 Worldwide reach | ⚡ Real-time matching`;
};

/**
 * Пытается отправить приветственное фото
 */
export const trySendWelcomePhoto = async (
  bot: Bot,
  chatId: number,
  config: BotConfig,
): Promise<boolean> => {
  try {
    const photoPath = path.join(config.assetsPath, 'photo_2025-05-22_19-02-13.jpg');

    // Проверяем файл
    const fileExists = await checkFileExists(photoPath);
    if (!fileExists) {
      console.warn(`⚠️ Welcome photo not found: ${photoPath}`);
      return false;
    }

    const fileSize = await getFileSize(photoPath);
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    if (fileSize > MAX_SIZE) {
      console.warn(`⚠️ Welcome photo too large: ${fileSize} bytes`);
      return false;
    }

    if (!isAllowedImage(photoPath)) {
      console.warn(`⚠️ Unsupported image format: ${photoPath}`);
      return false;
    }

    await bot.api.sendPhoto(chatId, new InputFile(fs.createReadStream(photoPath)), {
      caption: createWelcomeMessage(),
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[
          { text: '💼 Find your match', web_app: { url: config.webAppUrl } },
        ]],
      },
    });

    return true;
  } catch (error) {
    console.warn('⚠️ Failed to send welcome photo:', error);
    return false;
  }
};

/**
 * Отправляет текстовое приветствие
 */
export const sendTextWelcome = async (
  bot: Bot,
  chatId: number,
  config: BotConfig,
): Promise<void> => {
  const buttons = [[
    { text: '🚀 Open InvestMatch', web_app: { url: config.webAppUrl } },
  ]];

  if (config.supportUrl) {
    buttons.push([
      { text: '🆘 Get Support', web_app: { url: config.supportUrl } },
    ]);
  }

  await bot.api.sendMessage(chatId, createWelcomeMessage(), {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: buttons },
  });
};

/**
 * Настройка обработчиков команд
 */
export const setupBotCommands = (bot: Bot, config: BotConfig): void => {
  // Команда /start
  bot.command('start', async (ctx) => {
    if (!ctx.from) {
      await ctx.reply('Could not retrieve user information');
      return;
    }

    console.log(`👋 User ${ctx.from.id} started the bot`);

    try {
      const photoSent = await trySendWelcomePhoto(bot, ctx.chat.id, config);

      if (!photoSent) {
        await sendTextWelcome(bot, ctx.chat.id, config);
      }

      console.log(`✅ Welcome sent to user ${ctx.from.id}`);
    } catch (error) {
      console.error('❌ Error in /start:', error);
      await ctx.reply('❌ An error occurred. Please try again.');
    }
  });

  // Команда /help
  bot.command('help', async (ctx) => {
    await ctx.reply(
      `🤖 <b>InvestMatch Bot Commands</b>\n\n` +
      `/start - Start the bot\n` +
      `/help - Show this message\n` +
      `/status - Check bot status\n\n` +
      `💡 <i>Use web app for full functionality</i>`,
      { parse_mode: 'HTML' },
    );
  });

  // Команда /status
  bot.command('status', async (ctx) => {
    await ctx.reply(
      `🔍 <b>Bot Status</b>\n\n` +
      `Status: 🟢 Running\n` +
      `Environment: ${process.env.NODE_ENV || 'development'}\n` +
      `Web App: ${config.webAppUrl}`,
      { parse_mode: 'HTML' },
    );
  });

  // Обработка обычных сообщений
  bot.on('message:text', async (ctx) => {
    if (ctx.message.text.startsWith('/')) return;

    await ctx.reply(
      `💬 For full functionality, please use our web app:`,
      {
        reply_markup: {
          inline_keyboard: [[
            { text: '🚀 Open Web App', web_app: { url: config.webAppUrl } },
          ]],
        },
      },
    );
  });
};

/**
 * Настройка обработчиков ошибок
 */
export const setupErrorHandlers = (bot: Bot): void => {
  bot.catch((error) => {
    console.error('🤖 Bot error:', error);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });
};

/**
 * Создает middleware для логирования
 */
export const createLoggingMiddleware = () => {
  return async (ctx: any, next: () => Promise<void>) => {
    const startTime = Date.now();

    try {
      await next();
    } finally {
      const duration = Date.now() - startTime;

      if (process.env.NODE_ENV === 'production') {
        console.log(`📝 Update processed in ${duration}ms`, {
          updateId: ctx.update.update_id,
          userId: ctx.from?.id,
          duration,
        });
      }
    }
  };
};
