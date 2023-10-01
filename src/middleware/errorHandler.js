import { CustomError } from '../constants/customError.js'

const errorHandler = (err, ctx) => {
	let message
	if (err instanceof CustomError) {
		message = err.message
	} else {
		message = 'Something went wrong'
		console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
	}
	try {
		ctx.reply(message, {
			// eslint-disable-next-line camelcase
			reply_to_message_id: ctx.message.message_id,
		})
	} catch (error) {
		console.log('Error while sending error message', error)
	}
}

export default errorHandler
