export const getDefaultDialog = (text) => [
  {
    role: 'user',
    content:
      'Answer concise and short, but include all of the neccesary details.' +
      text,
  },
]
