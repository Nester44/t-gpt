import './config.js'

import { Telegraf } from 'telegraf'
import commandDescription from './constants/commands.js'
import gptController from './controller/gptController.js'
import allowMiddleware from './middleware/allowMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import extractInput from './middleware/extractInputMiddleware.js'
import loggerMiddleware from './middleware/loggerMiddleware.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_ID)

bot.command(allowMiddleware)
bot.command(extractInput)
bot.command(loggerMiddleware)

bot.command('sho', gptController.query)
bot.command('stream', gptController.stream)

bot.catch(errorHandler)

bot.telegram.setMyCommands(commandDescription)
bot.launch()
