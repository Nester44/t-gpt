class MessageStorageService {
	constructor(initialMessage) {
		this.messages = {}
		this.addMessage('initialMessage', initialMessage, 'system', null)
		this.messagesLimit = process.env.CONTEXT_LIMIT || 10
	}
	/**
	 *
	 * @param {number} id
	 * @param {string} content
	 * @param {'assistant' | 'user'} role
	 * @param {number} replyTo
	 */
	addMessage(id, content, role, replyTo = 'initialMessage') {
		if (Object.keys(this.messages).length >= this.messagesLimit) {
			console.log('Messages limit exceeded')
			this.clearMessages()
		}

		this.messages[id] = { content, role, replyTo }
	}

	getDialog(id) {
		let message = this.messages[id]
		if (!message) message = this.messages.initialMessage
		const { content, role } = message
		const dialog = [{ content, role }]

		if (message.replyTo) {
			dialog.unshift(...this.getDialog(message.replyTo))
		}

		return dialog
	}

	clearMessages() {
		const initialMessage = this.messages.initialMessage
		this.messages = { initialMessage }
	}

	changeInitialMessage(content) {
		this.messages.initialMessage.content = content
	}
}

export default MessageStorageService
