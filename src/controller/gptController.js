/* eslint-disable camelcase */
import gptService from '../service/gptService.js'
import messageStorage from '../service/messageStorage.js'
import { isReplyToMyMessage } from '../utils.js'

class GptController {
  async query(ctx) {
    const input = ctx.state.input
    messageStorage.addMessage(ctx.message.message_id, input, 'user')
    const response = await gptService.query(input)

    const sentMessage = await ctx.reply(response, {
      reply_to_message_id: ctx.message.message_id,
    })

    messageStorage.addMessage(
      sentMessage.message_id,
      response,
      'assistant',
      ctx.message.message_id,
    )
  }

  async reply(ctx) {
    if (ctx.updateType !== 'message') return
    if (!isReplyToMyMessage(ctx)) return
    const replyToMessageId = ctx.message.reply_to_message.message_id
    messageStorage.addMessage(
      ctx.message.message_id,
      ctx.message.text,
      'user',
      replyToMessageId,
    )
    const dialog = messageStorage.getDialog(ctx.message.message_id)
    const response = await gptService.query('', dialog)
    const sentMessage = await ctx.reply(response, {
      reply_to_message_id: ctx.message.message_id,
    })
    messageStorage.addMessage(
      sentMessage.message_id,
      response,
      'assistant',
      ctx.message.message_id,
    )
  }
}

export default new GptController()
