const uuid = require('uuid/v4')

class Bridge {
  constructor (adapter) {
    this.adapter = adapter
    this.adapter.connect()
  }

  dispatch (action, params, callBack) {
    const id = 1 // uuid()
    this.adapter.postMessage({
      id,
      payload: {
        action,
        params
      }
    })
    this.adapter.callBacks[id] = callBack
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
