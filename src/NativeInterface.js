const uuid = require('uuid/v4')

class NativeInterface {
  constructor ({ listeners, callBacks }) {
    this.listeners = listeners
    this.callBacks = callBacks
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
    return new Promise(resolve => {
      this.callBacks[id](params)
      resolve({
        status: 'web receive callBack success'
      })
    })
  }
}

module.exports = NativeInterface
