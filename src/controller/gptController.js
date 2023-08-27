/* eslint-disable camelcase */
import GptService from '../service/gptService.js'

class GptController {
  async query(ctx) {
    const input = ctx.state.input
    const response = await GptService.query(input)

    ctx.reply(response, {
      reply_to_message_id: ctx.message.message_id,
    })
  }
}

export default new GptController()
