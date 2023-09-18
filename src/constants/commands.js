const commandDescription = [
	{
		command: 'sho',
		description: 'Спітаті чатгіпуту',
	},
	{
		command: 'shum',
		description: 'Ехо голосовое',
	},
	{
		command: 'penzlyk',
		description: 'Намалюваті малюнак',
	},
]

export const commands = commandDescription.map((c) => c.command)

export default commandDescription
