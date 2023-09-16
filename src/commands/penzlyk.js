/* eslint-disable camelcase */
import gptService from '../service/gptService.js'

const penzlyk = async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ').trim()

  if (!input)
    ctx.reply('А шож малювати', {
      reply_to_message_id: ctx.message.message_id,
    })
  try {
    const imageUrl = await gptService.generateImage(input)
    ctx.replyWithPhoto(
      { url: imageUrl },
      { reply_to_message_id: ctx.message.message_id },
    )
  } catch (error) {
    ctx.reply(error.message, { reply_to_message_id: ctx.message.message_id })
    console.error(error.message)
  }
}

export default penzlyk
