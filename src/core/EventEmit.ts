class EventEmit {
  #listener: {
    [key: string]: Function[];
  } = {};

  public on(event: string, handler: Function) {
    this.#listener[event] = this.#listener[event] ?? [];
    this.#listener[event].push(handler);
  }

  public emit<T>(event: string, params?: T) {
    if (this.#listener[event]) {
      this.#listener[event].forEach(f => f(params));
    }
  }

  public remove(event: string, handler: Function) {
    if (this.#listener[event]) {
      this.#listener[event] = this.#listener[event].filter(
        f => f !== handler
      );
    }
  }
}

export default EventEmit;
