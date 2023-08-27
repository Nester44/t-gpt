class MessageStorageService {
  constructor() {
    this.messages = {}
  }

  addMessage(id, content, role, replyTo) {
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