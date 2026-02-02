// import { Bot, InputFile } from 'grammy';
// import * as fs from 'fs';
// import * as path from 'path';
//
//
// export function createBot(token: string) {
//
//   if (!token) {
//     throw new Error('❌ TOKEN_BOT_DEV не установлен в переменных окружения');
//   }
//   const bot = new Bot(token);
//
//
//   bot.command('start', async (ctx) => {
//     if (!ctx.from) {
//       await ctx.reply('Не удалось получить информацию о пользователе');
//       return;
//     }
//     try {
//       const filePath = path.resolve(process.cwd(), 'public', 'assets', 'photo_2025-05-22_19-02-13.jpg');
//       if (fs.existsSync(filePath)) {
//         await ctx.replyWithPhoto(new InputFile(fs.createReadStream(filePath)), {
//           caption: `<b>Welcome to investmatch</b>\n\n` +
//             `We help <i>founders and investors</i> find each other:\n\n` +
//             `• <b>For founders</b> – automatic matching by industry, stage and funding amount\n` +
//             `• Built-in chat with templates and secure doc exchange\n` +
//             `• Dashboard of profile views, responses and improvement tips\n\n` +
//             `• <b>For investors</b> – filters by sector, stage and region\n` +
//             `• Daily startup digests, scoring and KPI summaries\n` +
//             `• Secure file sharing and real-time alerts\n\n` +
//             `🏆 <i>Trusted by 115+ founders, 35 angels and 2 accelerators</i>\n🌍 Worldwide reach`,
//           parse_mode: 'HTML',
//           reply_markup: {
//             inline_keyboard: [
//               [
//                 { text: '💼 Find your match', web_app: { url: 'https://tg-invesmatch.onrender.com/' } },
//               ],
//             ],
//           },
//         });
//       } else {
//         await ctx.reply(`🚀 Welcome to investmatch`, {
//           reply_markup: {
//             inline_keyboard: [
//               [
//                 {
//                   text: 'Open Investmatch',
//                   web_app: { url: 'https://tg-bot-support-delta.vercel.app/' },
//                 },
//               ],
//             ],
//           },
//         });
//       }
//
//     } catch (error) {
//       console.error('Error in start command:', error);
//       await ctx.reply('❌ Произошла ошибка. Пожалуйста, попробуйте снова.');
//     }
//   });
//   return bot;
// }
//
// // async function botApi() {
// //     await bot.api.sendMessage(909630753, "Welcome to investmatch, we helps founders and investors find each other: for founders – automatic matching by industry, stage and funding amount; built-in chat with templates and secure doc exchange; dashboard of profile views, responses and improvement tips. For investors – filters by sector, stage and region; daily startup digests; scoring and metrics; instant pitch previews and KPI summaries; secure file sharing and real-time alerts. Trusted by 115+ founders, 35 angels and 2 accelerators. Worldwide reach.!");
// //     // await bot.command('start',{middleware})
// //     const me = await bot.api.getMe();
// //     console.log("botApi", me);
// // }
//
// // botApi();
// // Now that you specified how to handle messages, you can start your bot.
// // This will connect to the Telegram servers and wait for messages.
//
// // Start the bot.
//
//
