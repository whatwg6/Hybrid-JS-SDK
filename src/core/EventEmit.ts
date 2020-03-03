import { Listener } from "../../types/EventEmit";

class EventEmit {
  private listener: Listener = {};

  public on(event: string, handler: Function): void {
    this.listener[event] = this.listener[event] || [];
    this.listener[event].push(handler);
  }

  public emit(event: string, params: any): void {
    if (this.listener[event]) {
      this.listener[event].forEach(f => f(params));
    }
  }

  public remove(event: string, handler: Function): void {
    if (this.listener[event]) {
      this.listener[event] = this.listener[event].filter(
        f => f !== handler
      );
    }
  }
}

export default EventEmit;
