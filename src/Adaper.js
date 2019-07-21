const NativeInterface = require('./NativeInterface')

const uuid = require('uuid/v4')

class Adapter {
  constructor () {
    this.listeners = {}
    this.callBacks = {}
  }

  postMessage ({ id, payload: { action, params } }) {
    const hybridMessage = {
      id,
      action,
      params
    }

    if (
      global.webkit &&
      global.webkit.messageHandlers &&
      global.webkit.messageHandlers.nativeApp
    ) {
      global.webkit.messageHandlers.nativeApp.postMessage(hybridMessage)
    } else if (global.nativeApp && global.nativeApp.sendToNative) {
      global.nativeApp.sendToNative(JSON.stringify(hybridMessage))
    }
  }

  connect () {
    const { listeners, callBacks } = this

    global.webApp = new NativeInterface({
      listeners,
      callBacks
    })
  }
}

module.exports = Adapter
