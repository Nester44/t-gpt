import './config.js'

import { Input, Telegraf } from 'telegraf'
import commandDescription from './constants/commands.js'
import gptController from './controller/gptController.js'
import allowMiddleware from './middleware/allowMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import extractInput from './middleware/extractInputMiddleware.js'
import loggerMiddleware from './middleware/loggerMiddleware.js'
import synthesizeVoice from './service/textToSpeechService.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_ID)

bot.command(allowMiddleware)
bot.command(loggerMiddleware)
bot.command('sho', extractInput, gptController.query)
bot.command('shum', async (ctx) => {
  const input = ctx.message.text.slice(5)

  if (!input) {
    return ctx.reply('Напиши что-нибудь после команды')
  }
  const buffer = await synthesizeVoice(input)

  if (!buffer) return
  await ctx.replyWithVoice(Input.fromBuffer(buffer)) // Send the generated audio
})
bot.use(gptController.reply)

bot.catch(errorHandler)

bot.telegram.setMyCommands(commandDescription)

export default bot
