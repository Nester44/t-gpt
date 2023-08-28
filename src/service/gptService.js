import OpenAI from 'openai'

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

class GptService {
  async query(messages) {
    const response = await openAi.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
    })
    const text = response.choices[0].message.content
    return text
  }
}

export default new GptService()
