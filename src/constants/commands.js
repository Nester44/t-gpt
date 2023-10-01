const commands = [
	{
		command: 'sho',
		description: 'Спітаті чатгіпуту',
		requireArgs: true,
	},
	{
		command: 'shum',
		description: 'Ехо голосовое',
		requireArgs: true,
	},
	{
		command: 'penzlyk',
		description: 'Намалюваті малюнак',
		requireArgs: true,
	},
	{
		command: 'switch',
		description: 'Змініці мод чатгіпуту (брiдятина/норм)',
		requireArgs: false,
	},
]

export const commandsNames = commands.map((c) => c.command)

export const isCommandWithArguments = (comandName) => {
	const command = commands.find((c) => c.command === comandName)
	return command.requireArgs
}

export const commandsDescriptions = commands.map(
	({ description, command }) => ({ description, command }),
)
