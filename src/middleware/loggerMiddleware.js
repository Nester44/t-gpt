const loggerMiddleware = (ctx, next) => {
	const text = ctx.message.text
	const from = ctx.message.from.username
	const chat = ctx.chat.title || 'DM'
	const time = new Date().toLocaleTimeString()

	console.log('\n')
	console.log(time)
	console.log('New message:\n')
	console.log('from: ', from)
	console.log('text: ', text)
	console.log('chat: ', chat)
	return next()
}

export default loggerMiddleware
