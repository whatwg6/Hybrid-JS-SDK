class EventEmit {
  constructor(private listener = {}) {}

  public on(eventName: string, handler: Function): void {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].push(handler);
  }

  public emit(eventName: string, params: any): void {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].forEach(f => f(params));
  }

  public remove(eventName: string, handler: Function): void {
    const listeners = this.listener[eventName];
    if (listeners && listeners.length) {
      const findIndex = listeners.findIndex(f => f === handler);
      listeners.splice(findIndex, 1);
    }
  }
}

export default EventEmit;
