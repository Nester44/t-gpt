import synthesizeVoice from '../service/textToSpeechService.js'

class GptController {
	constructor(gptService) {
		this.gptService = gptService
	}
	query = async (ctx) => {
		const input = ctx.state.input

		const messageId = ctx.message.message_id
		const replyToId = ctx.message?.reply_to_message?.message_id

		const [response, handleSentMessage] = await this.gptService.query(
			input,
			messageId,
			replyToId,
		)

		const voice = await synthesizeVoice(response)

		const sentMessage = await ctx.replyWithVoice(voice, {
			// eslint-disable-next-line camelcase
			reply_to_message_id: messageId,
			caption: response,
		})

		handleSentMessage(sentMessage.message_id)
	}

	switchMode = (ctx) => {
		const mode = this.gptService.switchMode()
		console.log('Mode switched to', mode)
		ctx.reply('Режим успешно изменен на ' + mode)
	}
}

export default GptController
