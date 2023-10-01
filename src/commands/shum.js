import { Input } from 'telegraf'
import synthesizeVoice from '../service/textToSpeechService.js'

const shum = async (ctx) => {
	const input = ctx.state.input
	const buffer = await synthesizeVoice(input)

	if (!buffer) return
	await ctx.replyWithVoice(Input.fromBuffer(buffer)) // Send the generated audio
}

export default shum
