import OpenAI from 'openai'
import { createDefaultDialog } from '../dialogs/default.js'

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

class GptService {
  async query(input, dialog = []) {
    const response = await openAi.chat.completions.create({
      messages: dialog.length ? dialog : createDefaultDialog(input),
      model: 'gpt-3.5-turbo',
    })
    const text = response.choices[0].message.content
    return text
  }
}

export default new GptService()
