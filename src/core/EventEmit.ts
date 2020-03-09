import type Event from "./Event";

type Listener = {
  [key: string]: Function[];
};

class EventEmit {
  #listener: Listener = {};

  public on(event: Event, handler: Function): void {
    this.#listener[event] = this.#listener[event] || [];
    this.#listener[event].push(handler);
  }

  public emit(event: Event, params?: any): void {
    if (this.#listener[event]) {
      this.#listener[event].forEach(f => f(params));
    }
  }

  public remove(event: Event, handler: Function): void {
    if (this.#listener[event]) {
      this.#listener[event] = this.#listener[event].filter(
        f => f !== handler
      );
    }
  }
}

export default EventEmit;
