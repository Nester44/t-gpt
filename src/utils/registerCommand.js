import { isCommandWithArguments } from '../constants/commands.js'
import extractInput from '../middleware/extractInputMiddleware.js'
import loggerMiddleware from '../middleware/loggerMiddleware.js'

// prettier-ignore
export const createCommandRegistrar = (bot) =>
	(commandName, ...middlewares) => {
    		const requireArgs = isCommandWithArguments(commandName)
    		const commandMiddlewares = [loggerMiddleware]

    		if (requireArgs) commandMiddlewares.unshift(extractInput)

    		bot.command(commandName, ...commandMiddlewares, ...middlewares)
    	}
