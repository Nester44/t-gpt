/* eslint-disable camelcase */
import './config.js'

import { Telegraf } from 'telegraf'
import chatGPT from './chatgpt.js'
import { commandDescription, isAllowed } from './constants.js'

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

  const isGroup = ctx.chat.type === 'group' || ctx.chat.type === 'supergroup'

  const editMessage = (chatId, messageId, text) =>
    ctx.telegram.editMessageText(chatId, messageId, 0, text)

  const sendMessage = (text) =>
    ctx.reply(text, {
      reply_to_message_id: ctx.message.message_id,
    })

  const streamMessage = async (stream) => {
    let sentMessage
    let isMessageSent = false
    let messageText = ''
    try {
      for await (const part of stream) {
        const partText = part.choices[0]?.delta?.content
        if (!partText) continue
        messageText += partText
        if (partText === ' ') continue
        if (isMessageSent) {
          await editMessage(
            sentMessage.chat.id,
            sentMessage.message_id,
            messageText,
          )
        } else {
          sentMessage = await sendMessage(messageText)
          isMessageSent = true
        }
      }
    } catch (error) {
      ctx.reply('Произошла ошибка')
      console.error(error)
    }
  }

  try {
    const response = await chatGPT(text, ctx.message.from.id, !isGroup)

    if (isGroup) {
      sendMessage(response.choices[0].message.content)
    } else {
      streamMessage(response)
    }
  } catch (error) {
    ctx.reply('Произошла ошибка')
    console.error(error)
  }
}

bot.telegram.setMyCommands(commandDescription)
bot.command('sho', botInterface)
bot.mention('nesterkrutbot', botInterface)
bot.launch()
