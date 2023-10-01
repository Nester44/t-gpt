import { commands } from '../constants/commands.js'

export const isCommandWithArguments = (comandName) => {
	const command = commands.find((c) => c.command === comandName)
	return command.requireArgs
}
