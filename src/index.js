import './config.js'

import { Telegraf } from 'telegraf'
import chatGPT from './chatgpt.js'
import { isAllowed } from './constants.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_ID)

const botInterface = async (ctx) => {
  const text = ctx.message.text
    .replace('/sho', '')
    .replace('@nesterkrutbot', '')
    .trim()

  if (!isAllowed(ctx)) return

  if (!text) {
    ctx.reply('You need to send a message after /sho or @nesterkrutbot')
    return
  }
  const response = await chatGPT(text, ctx.message.from.id)
  console.log({
    text,
    from: ctx.message.from.first_name + ctx.message.from.last_name,
    chat: ctx.chat.title,
    response,
  })
  // eslint-disable-next-line camelcase
  ctx.reply(response, { reply_to_message_id: ctx.message.message_id })
}

bot.command('sho', botInterface)
bot.mention('nesterkrutbot', botInterface)
bot.launch()
