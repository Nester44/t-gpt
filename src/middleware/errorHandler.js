const errorHandler = (err, ctx) => {
	console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
	try {
		const message = err.message || 'Something went wrong'
		ctx.reply(message, {
			// eslint-disable-next-line camelcase
			reply_to_message_id: ctx.message.message_id,
		})
	} catch (error) {
		console.log('Error while sending error message', error)
	}
}

export default errorHandler
