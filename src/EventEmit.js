class EventEmit {
  constructor() {
    this.listener = {};
  }

  on(eventName, callBack) {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].push(callBack);
  }

  emit(eventName, params) {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].forEach(f => f(params));
  }
}

module.exports = EventEmit;
