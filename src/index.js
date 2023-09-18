import { createServer } from 'http'
import bot from './bot.js'

const PORT = process.env.PORT || 3000

createServer(
	await bot.createWebhook({
		domain: process.env.WEBHOOK_DOMAIN,
		port: PORT,
	}),
).listen(PORT, () => {
	console.log(`Bot is running on production mode at port ${PORT}`)
	console.log('NODE_ENV', process.env.NODE_ENV)
})

// if (process.env.NODE_ENV === 'production') {
// 	createServer(
// 		await bot.createWebhook({
// 			domain: process.env.WEBHOOK_DOMAIN,
// 			port: PORT,
// 		}),
// 	).listen(PORT, () => {
// 		console.log(`Bot is running on production mode at port ${PORT}`)
// 	})
// } else {
// 	bot.launch()
// 	console.log('Bot is running on development mode')
// }
