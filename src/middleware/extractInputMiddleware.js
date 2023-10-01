import { commands } from '../constants/commands.js'

const extractInput = (ctx, next) => {
	const match = ctx.message.text.match(/^\/(\w+)\s*(.*)/)
	if (match) {
		const [, command, input] = match

		if (!commands.includes(command)) return

		if (!input) throw new Error('Напиши текст, трясця')

		ctx.state.input = input
	}

	return next()
}

export default extractInput
