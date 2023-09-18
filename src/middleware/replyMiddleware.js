export const replyMiddleware = async (ctx, next) => {
	const replyToMessage = ctx.message.reply_to_message
	if (!replyToMessage) return
	if (replyToMessage.from.id !== ctx.botInfo.id) return
	next()
}
