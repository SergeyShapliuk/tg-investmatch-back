export interface BotConfig {
  token: string;
  webAppUrl: string;
  supportUrl?: string;
  assetsPath: string;
}

export interface BotState {
  isRunning: boolean;
  botInfo: any | null;
  startTime: Date | null;
}

export interface BotInstance {
  bot: any;
  state: BotState;
  config: BotConfig;
  startBot: () => Promise<void>;
  stopBot: () => Promise<void>;
  getStatus: () => BotState;
}

// Экспортируем также вспомогательные функции
export { getBotConfig } from './config';
