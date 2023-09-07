import synthesizeVoice from "../service/textToSpeechService.js"
import { Input } from 'telegraf'

const shum = async (ctx) => {
  const input = ctx.message.text.slice(5)

  if (!input) {
    return ctx.reply('Напиши что-нибудь после команды')
  }
  const buffer = await synthesizeVoice(input)

  if (!buffer) return
  await ctx.replyWithVoice(Input.fromBuffer(buffer)) // Send the generated audio
}

export default shum