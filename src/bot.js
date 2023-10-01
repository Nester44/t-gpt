import './config.js'

import { Telegraf } from 'telegraf'
import { default as penzlyk } from './commands/penzlyk.js'
import { default as shum } from './commands/shum.js'
import {
	commandsDescriptions,
	isCommandWithArguments,
} from './constants/commands.js'
import { initialMessages } from './constants/initialMessages.js'
import GptController from './controller/gptController.js'
import allowMiddleware from './middleware/allowMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import extractInput from './middleware/extractInputMiddleware.js'
import loggerMiddleware from './middleware/loggerMiddleware.js'
import { replyMiddleware } from './middleware/replyMiddleware.js'
import GptService from './service/gptService.js'
import MessageStorageService from './service/messageStorage.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_ID)

const messageStorage = new MessageStorageService(initialMessages.useful)
const gptService = new GptService(messageStorage)
const gptController = new GptController(gptService)

bot.command(allowMiddleware)

const registerCommand = (commandName, ...middlewares) => {
	const requireArgs = isCommandWithArguments(commandName)
	const commandMiddlewares = [loggerMiddleware]

	if (requireArgs) commandMiddlewares.unshift(extractInput)

	bot.command(commandName, ...commandMiddlewares, ...middlewares)
}

registerCommand('switch', gptController.switchMode)
registerCommand('sho', gptController.query)
registerCommand('shum', shum)
registerCommand('penzlyk', penzlyk)
bot.on('message', replyMiddleware, loggerMiddleware, gptController.query)

bot.catch(errorHandler)

bot.telegram.setMyCommands(commandsDescriptions)

export default bot
