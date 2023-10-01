import OpenAI from 'openai'
import { initialMessages } from '../constants/initialMessages.js'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const defaultModel = 'gpt-3.5-turbo-0613'

const model = process.env.OPENAI_MODEL || defaultModel

class GptService {
	constructor(messageStorage) {
		this.talksBullshit = false
		this.messageStorage = messageStorage
	}
	async createCompletion(messages) {
		const response = await openai.chat.completions.create({
			messages,
			model,
			temperature: 0.6,
		})
		const text = response.choices[0].message.content
		return text
	}

	query = async (input, messageId, replyToId) => {
		this.messageStorage.addMessage(messageId, input, 'user', replyToId)

		const dialog = this.messageStorage.getDialog(messageId)

		const response = await this.createCompletion(dialog)

		const handleSentMessage = (sentMessageId) => {
			this.messageStorage.addMessage(
				sentMessageId,
				response,
				'assistant',
				messageId,
			)
		}

		return [response, handleSentMessage]
	}

	async generateImage(prompt) {
		const response = await openai.images.generate({
			prompt,
			n: 1,
			size: '1024x1024',
		})

		return response.data[0].url
	}

	// TODO edit eslint config
	// prettier-ignore
	switchMode = () => {
		const content = this.talksBullshit ?
			initialMessages.useful :
			initialMessages.bullshit
		this.messageStorage.changeInitialMessage(content)
		this.talksBullshit = !this.talksBullshit
		return this.talksBullshit ? 'bullshit' : 'useful'
	}
}

export default GptService
