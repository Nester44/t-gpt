/* eslint-disable camelcase */
import GptService from '../service/gptService.js'
import { isMessageEmpty } from '../utils.js'

class GptController {
  async query(ctx) {
    const input = ctx.state.input
    const response = await GptService.query(input)

    ctx.reply(response.choices[0].message.content, {
      reply_to_message_id: ctx.message.message_id,
    })
  }

  async stream(ctx) {
    const input = ctx.state.input
    const stream = await GptService.query(input, true)

    let sentMessageId = null
    let isMessageSent = false
    let messageText = ''
    for await (const chunk of stream) {
      const messagePart = chunk.choices[0]?.delta?.content
      messageText += messagePart
      /**
       * messagePart can be space or '\n'
       * telegram doesn't allow to send "empty" messages
       */
      console.log(messagePart)
      if (isMessageEmpty(messagePart)) continue

      try {
        if (!isMessageSent) {
          const message = await ctx.reply(messageText, {
            reply_to_message_id: ctx.message.message_id,
          })
          sentMessageId = message.message_id
          isMessageSent = true
        } else {
          await ctx.telegram.editMessageText(
            ctx.chat.id,
            sentMessageId,
            null,
            messageText,
          )
        }
      } catch (error) {
        console.error(error)
        // 429 - too many requests
        // wait 1 second and try again
        if (error.response.error_code === 429) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
    }
  }
}

export default new GptController()
