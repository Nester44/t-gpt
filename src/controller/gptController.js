/* eslint-disable camelcase */
import { Input } from 'telegraf'
import gptService from '../service/gptService.js'
import messageStorage from '../service/messageStorage.js'
import synthesizeVoice from '../service/textToSpeechService.js'

class GptController {
	async query(ctx) {
		const input = ctx.state.input
		messageStorage.addMessage(ctx.message.message_id, input, 'user')

		const dialog = messageStorage.getDialog(ctx.message.message_id)
		const response = await gptService.query(dialog)

		const buffer = await synthesizeVoice(response)

		if (!buffer) return
		const sentMessage = await ctx.replyWithVoice(Input.fromBuffer(buffer), {
			reply_to_message_id: ctx.message.message_id,
			caption: response,
		})

		messageStorage.addMessage(
			sentMessage.message_id,
			response,
			'assistant',
			ctx.message.message_id,
		)
	}

	async reply(ctx) {
		const text = ctx.message.text

		const replyToMessageId = ctx.message.reply_to_message.message_id
		messageStorage.addMessage(
			ctx.message.message_id,
			text,
			'user',
			replyToMessageId,
		)
		const dialog = messageStorage.getDialog(ctx.message.message_id)
		const response = await gptService.query(dialog)
		const buffer = await synthesizeVoice(response)
		if (!buffer) return
		const sentMessage = await ctx.replyWithVoice(Input.fromBuffer(buffer), {
			reply_to_message_id: ctx.message.message_id,
			caption: response,
		})
		messageStorage.addMessage(
			sentMessage.message_id,
			response,
			'assistant',
			ctx.message.message_id,
		)
	}
}

export default new GptController()
