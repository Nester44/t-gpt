import { allowedGroupIds, allowedUserIds } from '../constants/allowed.js'

const allowMiddleware = (ctx, next) => {
  if (ctx.chat.type === 'private') {
    if (!allowedUserIds.includes(ctx.message.from.id)) {
      ctx.reply('You are not allowed to use this bot')
      return
    }
    return next()
  }
  if (!allowedGroupIds.includes(ctx.chat.id)) {
    ctx.reply('Bot cannot be used in this group')
    return
  }
  return next()
}

export default allowMiddleware
