import path from 'path';

export interface BotConfig {
  token: string;
  webAppUrl: string;
  supportUrl?: string;
  assetsPath: string;
}

// Определяем типы для окружений
type Environment = 'development' | 'production' | 'test';

interface EnvironmentConfig {
  token: string;
  webAppUrl: string;
  supportUrl?: string;
}

export const getBotConfig = (): BotConfig => {
  const env = (process.env.NODE_ENV || 'development') as Environment;

  const baseConfig = {
    assetsPath: path.join(process.cwd(), 'public', 'assets'),
  };

  const envConfigs: Record<Environment, EnvironmentConfig> = {
    development: {
      token: process.env.TOKEN_BOT_DEV || '',
      webAppUrl: 'https://tg-investmatch-back.onrender.com',
      // supportUrl: 'https://tg-bot-support-delta.vercel.app/',
    },
    production: {
      token: process.env.TOKEN_BOT_PROD || '',
      webAppUrl: 'https://tg-investmatch-back.onrender.com',
      // supportUrl: undefined,
    },
    test: {
      token: 'test-token',
      webAppUrl: 'http://localhost:3000',
      // supportUrl: undefined,
    },
  };

  // Получаем конфигурацию для текущего окружения
  const envConfig = envConfigs[env] || envConfigs.development;

  const config = {
    ...baseConfig,
    ...envConfig
  };

  // Валидация
  if (!config.token) {
    throw new Error(`Bot token not configured for ${env} environment`);
  }

  return config;
};
