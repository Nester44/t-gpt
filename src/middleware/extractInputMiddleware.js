import { commandsNames } from '../constants/commands.js'
import { CustomError } from '../constants/customError.js'

const extractInput = (ctx, next) => {
	const match = ctx.message.text.match(/^\/(\w+)\s*(.*)/)
	if (match) {
		const [, command, input] = match

		if (!commandsNames.includes(command)) return

		if (!input) throw new CustomError('Напиши текст, трясця')

		ctx.state.input = input
	}

	return next()
}

export default extractInput
