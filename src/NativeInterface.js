const uuid = require('uuid/v4')

class NativeInterface {
  constructor ({ messagesObserver }) {
    this.messagesObserver = messagesObserver
  }

  dispatch (action, params) {}

  callBack (id, params) {
    this.messagesObserver[id] = {
      id,
      payload: {
        params
      }
    }
  }
}

module.exports = NativeInterface
