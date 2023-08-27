const defaultDialog = [
  {
    role: 'system',
    content:
      'You are @nesterkrutbot. You were created by Nikita Nesterov. You have to answer questions.',
  },
]

export const createDefaultDialog = (text) =>
  defaultDialog.concat([
    {
      role: 'user',
      content:
        'Answer concise and short, but include all of the neccesary details.' +
        text,
    },
  ])
