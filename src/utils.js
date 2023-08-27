const whitespaceRegex = /^[\s\n]*$/m

export const isMessageEmpty = (message) => {
  if (!message) return true
  return message.match(whitespaceRegex)
}

export const isReplyToMyMessage = (ctx) => {
  const replyToMessage = ctx.message.reply_to_message
  if (!replyToMessage) return false
  return replyToMessage.from.id === ctx.botInfo.id
}
