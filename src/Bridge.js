const uuid = require('uuid/v4')

class Bridge {
  constructor (adapter) {
    this.adapter = adapter
    this.adapter.connect()
  }

  onDispatch (id) {
    return new Promise((resolve, reject) => {
      this.adapter.eventEmitter.on('messagesObserver', ({ messages }) => {
        const message = messages[id]
        if (messages[id]) {
          resolve(message.payload.params)
        }
        reject({ message, id })
      })
    })
  }

  dispatch (action, params) {
    const id = 1 // uuid()

    this.adapter.postMessage({
      id,
      payload: {
        action,
        params
      }
    })

    return this.onDispatch(id)
  }

  listen (action, handler) {}
}

module.exports = Bridge
