import { generateImage } from "../service/imageService.js"

const penzlyk = async(ctx) => {
    const input = ctx.message.text.replace('/penzlyk', '').trim()

    if (!input) ctx.reply('Напиши ти трясця інструкцію', { reply_to_message_id: ctx.message.message_id,})    
    try {
        const imageUrl = await generateImage(input)
        ctx.replyWithPhoto({ url: imageUrl }, { reply_to_message_id: ctx.message.message_id,});

    } catch (error) {
        ctx.reply(error.message, { reply_to_message_id: ctx.message.message_id,})
        console.error(error.message)        
    }
}

export default penzlyk