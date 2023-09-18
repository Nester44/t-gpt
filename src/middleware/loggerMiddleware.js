const loggerMiddleware = (ctx, next) => {
	console.log({
		text: ctx.message.text,
		from: ctx.message.from.first_name + ctx.message.from.last_name,
		chat: ctx.chat.title || 'DM',
		chatId: ctx.chat.id,
		time: new Date().toLocaleTimeString(),
	})
	return next()
}

export default loggerMiddleware
