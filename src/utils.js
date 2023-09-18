const whitespaceRegex = /^[\s\n]*$/m

export const isMessageEmpty = (message) => {
	if (!message) return true
	return message.match(whitespaceRegex)
}
