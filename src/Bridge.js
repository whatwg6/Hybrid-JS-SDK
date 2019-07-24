const uuid = require('uuid/v4')

class Bridge {
  constructor (adapter) {
    this.adapter = adapter
    this.adapter.connect()
  }

  onCallback (id) {
    return new Promise((resolve, reject) => {
      this.adapter.eventEmitter.on('messagesObserver', ({ messages }) => {
        const message = messages[id]
        if (message) {
          resolve(message.payload.params)
        }
        reject({ messages, id })
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

    return this.onCallback(id)
  }

  listen (action, handler) {
    const listeners = this.adapter.listeners

    if (!listeners[action]) {
      listeners[action] = []
    }

    listeners[action].push(handler)

    return () => {
      listeners[action].splice(
        listeners[action].findIndex(listen => listen === handler),
        1
      )
      console.log(`unscribe ${action}`)
    }
  }
}

module.exports = Bridge
