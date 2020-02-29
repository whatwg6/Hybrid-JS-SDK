class EventEmit {
  constructor() {
    this.listener = {};
  }

  on(eventName, handler) {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].push(handler);
  }

  emit(eventName, params) {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].forEach(f => f(params));
  }

  remove(eventName, handler) {
    const listeners = this.listener[eventName];
    if (listeners && listeners.length) {
      const findIndex = listeners.findIndex(f => f === handler);
      listeners.splice(findIndex, 1);
    }
  }
}

module.exports = EventEmit;
