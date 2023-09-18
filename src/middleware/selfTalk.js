import gptService from '../service/gptService.js'
import messageStorage from '../service/messageStorage.js'

const initialMessageContent = 'Ты себя нормально чувствуешь?'
const timeout = 5 * 1000

const selfTalk = async (bot, chatId) => {
	console.log('Self talk started')

	const replyToOwnMessage = async (replyToId, role = 'user') => {
		const dialog = messageStorage.getDialog(replyToId)
		const response = await gptService.query(dialog)

		const message = await bot.telegram.sendMessage(chatId, response, {
			// eslint-disable-next-line camelcase
			reply_to_message_id: replyToId,
		})

		messageStorage.addMessage(message.message_id, response, role, replyToId)

		setTimeout(
			() =>
				replyToOwnMessage(
					message.message_id,
					role === 'assistant' ? 'user' : 'assistant',
				),
			timeout,
		)
	}

	replyToOwnMessage(initialMessageContent)
}

export default selfTalk
