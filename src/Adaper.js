const EventEmitter = require('eventemitter3')
const NativeInterface = require('./NativeInterface')

class Adapter {
  constructor () {
    this.messages = {}
    this.eventEmitter = new EventEmitter()
    this.messagesObserver = new Proxy(this.messages, {
      set: (target, key, value, receiver) => {
        const result = Reflect.set(target, key, value, receiver)
        this.eventEmitter.emit('messagesObserver', {
          messages: this.messages
        })
        return result
      }
    })
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
    const { messagesObserver, eventEmitter } = this

    global.webApp = new NativeInterface({
      messagesObserver,
      eventEmitter
    })
  }
}

module.exports = Adapter
