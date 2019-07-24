const uuid = require('uuid/v4')

class NativeInterface {
  constructor ({ messagesObserver, listeners }) {
    this.messagesObserver = messagesObserver
    this.listeners = listeners
  }

  dispatch (action, params) {
    return new Promise((resolve, reject) => {
      const id = uuid()
      const actionListeners = this.listeners[action]

      if (actionListeners && actionListeners.length) {
        actionListeners.forEach(listener => {
          listener(params)
          resolve({
            id,
            status: `web receive ${action} success`
          })
        })
      } else {
        reject({
          id,
          status: `web unregister ${action}`
        })
      }
    })
  }

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
