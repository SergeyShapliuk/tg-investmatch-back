
import { createWelcomeMessage } from '../core';
import createBot from '../index';

describe('Bot', () => {
  beforeEach(() => {
    // Мокаем переменные окружения
    process.env.NODE_ENV = 'test';
  });

  test('creates bot instance', () => {
    const botInstance = createBot('test-token');
    expect(botInstance).toBeDefined();
    expect(botInstance.bot).toBeDefined();
    expect(botInstance.startBot).toBeInstanceOf(Function);
    expect(botInstance.stopBot).toBeInstanceOf(Function);
  });

  test('welcome message is correct', () => {
    const message = createWelcomeMessage();
    expect(message).toContain('Welcome to InvestMatch');
    expect(message).toContain('For Founders');
    expect(message).toContain('For Investors');
  });

  test('bot starts and stops correctly', async () => {
    const botInstance = createBot('test-token');

    // Мокаем методы бота
    botInstance.bot.start = jest.fn().mockResolvedValue(undefined);
    botInstance.bot.stop = jest.fn().mockResolvedValue(undefined);
    botInstance.bot.api.getMe = jest.fn().mockResolvedValue({ username: 'test_bot' });

    await botInstance.startBot();
    expect(botInstance.state.isRunning).toBe(true);
    expect(botInstance.state.botInfo.username).toBe('test_bot');

    await botInstance.stopBot();
    expect(botInstance.state.isRunning).toBe(false);
  });
});
