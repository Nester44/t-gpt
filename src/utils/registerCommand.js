import { commandsDescriptions } from '../constants/commands.js'
import extractInput from '../middleware/extractInputMiddleware.js'
import loggerMiddleware from '../middleware/loggerMiddleware.js'
import { isCommandWithArguments } from './isCommandWithArgs.js'

// prettier-ignore
const createCommandRegistrar = (bot) =>
	(commandName, ...middlewares) => {
    		const requireArgs = isCommandWithArguments(commandName)
    		const commandMiddlewares = [loggerMiddleware]

    		if (requireArgs) commandMiddlewares.unshift(extractInput)

    		bot.command(commandName, ...commandMiddlewares, ...middlewares)
    	}

export const registerCommands = (bot, commands) => {
	const registerCommand = createCommandRegistrar(bot)

	for (const { command, handler } of commands)
		registerCommand(command, handler)

	// Add command's description to telegram
	bot.telegram.setMyCommands(commandsDescriptions)
}
