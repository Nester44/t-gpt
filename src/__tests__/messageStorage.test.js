import { initialMessages } from '../constants/initialMessages.js'
import MessageStorageService from '../service/messageStorage.js'

const initialMessage = initialMessages.useful
let messageStorage = new MessageStorageService(initialMessage)

beforeEach(() => {
	messageStorage = new MessageStorageService(initialMessage)
})

describe('addMesage', () => {
	it('should add a message to the storage with no reply', () => {
		const id = 1
		const content = 'test'
		const role = 'user'
		messageStorage.addMessage(id, content, role)

		expect(messageStorage.messages[id]).toEqual({
			content,
			role,
			replyTo: 'initialMessage',
		})
	})

	it('should add a message to the storage with a reply', () => {
		const id = 1
		const content = 'test'
		const role = 'user'
		const replyTo = 2
		messageStorage.addMessage(id, content, role, replyTo)

		expect(messageStorage.messages[id]).toEqual({
			content,
			role,
			replyTo,
		})
	})

	it('should clear messages if the limit is exceeded', () => {
		// Set the context limit to 1 for this test
		messageStorage.messagesLimit = 1

		// Add two messages
		messageStorage.addMessage(1, 'Message 1', 'user')
		const id = 2
		const content = 'test'
		const role = 'assistant'
		const replyTo = 1
		messageStorage.addMessage(id, content, role, 1)

		// Only the initial message should remain
		expect(messageStorage.messages).toEqual({
			initialMessage: {
				content: initialMessage,
				role: 'system',
				replyTo: null,
			},
			[id]: {
				content,
				role,
				replyTo,
			},
		})
	})
})

describe('getDialog', () => {
	it('should return a dialog for a given message ID', () => {
		// Add some messages to the storage
		messageStorage.addMessage(1, 'Message 1', 'user')
		messageStorage.addMessage(2, 'Message 2', 'assistant', 1)
		messageStorage.addMessage(3, 'Message 3', 'user', 2)

		// Get the dialog for message 3
		const dialog = messageStorage.getDialog(3)

		// The dialog should include all three messages in the correct order
		expect(dialog).toEqual([
			{ content: initialMessage, role: 'system' },
			{ content: 'Message 1', role: 'user' },
			{ content: 'Message 2', role: 'assistant' },
			{ content: 'Message 3', role: 'user' },
		])
	})

	it('should return a dialog with changed initial message', () => {
		// Add some messages to the storage
		messageStorage.addMessage(1, 'Message 1', 'user')
		messageStorage.changeInitialMessage('Changed initial message')
		const dialog = messageStorage.getDialog(1)
		expect(dialog).toEqual([
			{ content: 'Changed initial message', role: 'system' },
			{ content: 'Message 1', role: 'user' },
		])
	})

	it('should return a dialog with the initial message if the message does not exist', () => {
		// Add some messages to the storage
		messageStorage.addMessage(1, 'Message 1', 'user')
		const dialog = messageStorage.getDialog(2)
		expect(dialog).toEqual([{ content: initialMessage, role: 'system' }])
	})
})

describe('clearMessages', () => {
	it('should clear all messages except the initial one', () => {
		// Add some messages to the storage
		messageStorage.addMessage(1, 'Message 1', 'user')
		messageStorage.addMessage(2, 'Message 2', 'assistant', 1)
		messageStorage.addMessage(3, 'Message 3', 'user', 2)
		messageStorage.clearMessages()
		expect(messageStorage.messages).toEqual({
			initialMessage: {
				content: initialMessage,
				role: 'system',
				replyTo: null,
			},
		})
	})
})

describe('changeInitialMessage', () => {
	it('should change the initial message', () => {
		messageStorage.changeInitialMessage('Changed initial message')
		expect(messageStorage.messages.initialMessage.content).toEqual(
			'Changed initial message',
		)
	})
	it('should change the initial message and keep other messages', () => {
		messageStorage.addMessage(1, 'Message 1', 'user')
		messageStorage.changeInitialMessage('Changed initial message')
		expect(messageStorage.messages).toEqual({
			initialMessage: {
				content: 'Changed initial message',
				role: 'system',
				replyTo: null,
			},
			1: {
				content: 'Message 1',
				role: 'user',
				replyTo: 'initialMessage',
			},
		})
	})
})
