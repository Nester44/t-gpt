import OpenAI from 'openai'
import { isLove, messagesLove } from './constants.js'

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function chatgpt(text, message, stream) {
  const messages = [
    {
      role: 'user',
      content:
        'Answer concise and short, but include all of the neccesary details.' +
        text,
    },
  ]
  const response = await openAi.chat.completions.create({
    messages: isLove ? messagesLove : messages,
    model: 'gpt-3.5-turbo',
    stream,
  })
  return response
}

export default chatgpt
