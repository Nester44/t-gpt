import { commands } from '../constants/commands.js'

const extractInput = (ctx, next) => {
  const match = ctx.message.text.match(/^\/(\w+)\s*(.*)/)
  if (match) {
    const [, command, input] = match

    if (!commands.includes(command)) return

    if (!input)
      return ctx.reply('Text is required', {
        // eslint-disable-next-line camelcase
        reply_to_message_id: ctx.message.message_id,
      })

    ctx.state.input = input
  }

  return next()
}

export default extractInput
