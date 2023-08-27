const errorHandler = (err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  try {
    ctx.reply('Something went wrong')
  } catch (error) {
    console.log('Error while sending error message', error)
  }
}

export default errorHandler
