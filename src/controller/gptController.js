/* eslint-disable camelcase */
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

		// Telegram has a limit of 1000 characters per message with voice
		const slicedResponse = response.slice(0, 1000)

		const voice = await synthesizeVoice(slicedResponse)

		const sentMessage = await ctx.replyWithVoice(voice, {
			// eslint-disable-next-line camelcase
			reply_to_message_id: messageId,
			caption: slicedResponse,
		})

		handleSentMessage(sentMessage.message_id)
	}

	switchMode = (ctx) => {
		const mode = this.gptService.switchMode()
		console.log('Mode switched to', mode)
		ctx.reply('Режим успешно изменен на ' + mode)
	}

	penzlyk = async (ctx) => {
		const input = ctx.state.input

		const imageUrl = await this.gptService.generateImage(input)
		ctx.replyWithPhoto(
			{ url: imageUrl },
			{ reply_to_message_id: ctx.message.message_id },
		)
	}
}

export default GptController
