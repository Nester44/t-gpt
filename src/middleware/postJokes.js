import gptService from '../service/gptService.js'

const postJokes = async (bot) => {
	setInterval(async () => {
		try {
			const joke = await gptService.query(
				[
					{
						role: 'user',
						content:
							// eslint-disable-next-line max-len
							'Придумай шутку. В шутке используй персонажей по имени Миша и Олег. Шутка должна начаинаться с "Итак, анекдот". А после шутки ты должен объяснить шутку максимально подробно',
					},
				],
				10000,
			)
			bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, joke)
		} catch (error) {
			console.error(error)
		}
	}, 10 * 1000)
}

export default postJokes
