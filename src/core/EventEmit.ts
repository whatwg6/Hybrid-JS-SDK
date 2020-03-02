import { Listener } from "../types/EventEmit";

class EventEmit {
  private listener: Listener = {};

  public on(eventName: string, handler: Function): void {
    this.listener[eventName] = this.listener[eventName] || [];
    this.listener[eventName].push(handler);
  }

  public emit(eventName: string, params: any): void {
    if (this.listener[eventName]) {
      this.listener[eventName].forEach(f => f(params));
    }
  }

  public remove(eventName: string, handler: Function): void {
    if (this.listener[eventName]) {
      this.listener[eventName] = this.listener[eventName].filter(
        f => f !== handler
      );
    }
  }
}

export default EventEmit;
