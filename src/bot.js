import './config.js'

import { Telegraf } from 'telegraf'
import commandDescription from './constants/commands.js'
import gptController from './controller/gptController.js'
import allowMiddleware from './middleware/allowMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import extractInput from './middleware/extractInputMiddleware.js'
import loggerMiddleware from './middleware/loggerMiddleware.js'
import { isReplyToMyMessage } from './utils.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_ID)

bot.command(allowMiddleware)
bot.command(loggerMiddleware)
bot.command('sho', extractInput, gptController.query)
bot.use((ctx) => {
  if (isReplyToMyMessage(ctx)) {
    gptController.reply(ctx)
  }
})

bot.catch(errorHandler)

bot.telegram.setMyCommands(commandDescription)

export default bot
