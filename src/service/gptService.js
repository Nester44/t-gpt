import OpenAI from 'openai'
import { getDefaultDialog } from '../dialogs/default.js'

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

class GptService {
  async query(input, stream = false) {
    const response = await openAi.chat.completions.create({
      messages: getDefaultDialog(input),
      model: 'gpt-3.5-turbo',
      stream,
    })
    return response
  }
}

export default new GptService()
