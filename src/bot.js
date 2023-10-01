import './config.js'

import { Telegraf } from 'telegraf'
import { commands } from './constants/commands.js'
import container from './dependencyContainer.js'
import allowMiddleware from './middleware/allowMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import loggerMiddleware from './middleware/loggerMiddleware.js'
import { replyMiddleware } from './middleware/replyMiddleware.js'
import { registerCommands } from './utils/registerCommand.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_ID)

bot.use(allowMiddleware)

registerCommands(bot, commands)

bot.on(
	'message',
	replyMiddleware,
	loggerMiddleware,
	container.get('gptController').query,
)

bot.catch(errorHandler)

export default bot
