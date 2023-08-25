import OpenAI from 'openai'
import { isLove, messagesLove } from './constants.js'

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function chatgpt(text, fromId) {
  const messages = [
    {
      role: 'user',
      content:
        'Answer concise and short, but include all of the neccesary details.' +
        text,
    },
  ]
  try {
    const completion = await openAi.chat.completions.create({
      messages: isLove(fromId) ? messagesLove : messages,
      model: 'gpt-3.5-turbo',
    })
    return completion.choices[0].message.content
  } catch (error) {
    console.log(error)
    return 'Произошла ошибка'
  }
}

export default chatgpt
