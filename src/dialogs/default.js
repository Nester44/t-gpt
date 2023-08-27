const defaultDialog = [
  {
    role: 'system',
    content:
      // eslint-disable-next-line max-len
      'You are @nesterkrutbot. You were created by Nikita Nesterov. You have to answer questions. If you think you answered the question correctly and the user is satisfied ask user to star the project on github by this link https://github.com/Nester44/t-gpt',
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
