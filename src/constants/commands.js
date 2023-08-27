const commandDescription = [
  {
    command: 'sho',
    description: 'Спітаті чатгіпуту',
  },
  {
    command: 'stream',
    description: 'Спітаті чатгіпуту у режімі стріма',
  },
]

export const commands = commandDescription.map((c) => c.command)

export default commandDescription
