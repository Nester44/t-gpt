import { initialMessage } from '../dialogs/default.js'

class MessageStorageService {
  constructor() {
    this.messages = { initialMessage }
    this.contextLimit = Infinity
  }

  addMessage(id, content, role, replyTo = 'initialMessage') {
    if (Object.keys(this.messages).length > this.contextLimit) {
      this.messages = {}
    }
    this.messages[id] = { content, role, replyTo }
  }

  getDialog(id) {
    const message = this.messages[id]
    if (!message) return []
    const { content, role } = message
    const dialog = [{ content, role }]

    if (message.replyTo) {
      dialog.unshift(...this.getDialog(message.replyTo))
    }

    return dialog
  }
}

export default new MessageStorageService()
