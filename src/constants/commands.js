import shum from '../commands/shum.js'
import container from '../dependencyContainer.js'

const gptController = container.get('gptController')
export const commands = [
	{
		command: 'sho',
		description: 'Спітаті чатгіпуту',
		requireArgs: true,
		handler: gptController.query,
	},
	{
		command: 'shum',
		description: 'Ехо голосовое',
		requireArgs: true,
		handler: shum,
	},
	{
		command: 'penzlyk',
		description: 'Намалюваті малюнак',
		requireArgs: true,
		handler: gptController.penzlyk,
	},
	{
		command: 'switch',
		description: 'Змініці мод чатгіпуту (брiдятина/норм)',
		requireArgs: false,
		handler: gptController.switch,
	},
]

export const commandsNames = commands.map((c) => c.command)

export const commandsDescriptions = commands.map(
	({ description, command }) => ({ description, command }),
)
