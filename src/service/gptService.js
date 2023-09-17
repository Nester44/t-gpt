import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const defaultModel = 'gpt-3.5-turbo-0613'

const model = process.env.OPENAI_MODEL || defaultModel

class GptService {
	async query(messages) {
		const response = await openai.chat.completions.create({
			messages,
			model,
			temperature: 0.6,
			// eslint-disable-next-line camelcase
			max_tokens: 200,
		})
		const text = response.choices[0].message.content
		return text
	}
	async generateImage(prompt) {
		const response = await openai.images.generate({
			prompt,
			n: 1,
			size: '1024x1024',
		})

		return response.data[0].url
	}
}

export default new GptService()
