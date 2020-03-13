class EventEmitter {
  #listener = new Map<string, Set<Function>>();

  public on(event: string, handler: Function) {
    if (!this.#listener.has(event)) {
      this.#listener.set(event, new Set<Function>())
    }
    
    this.#listener.get(event)?.add(handler)
  }

  public emit<T>(event: string, params?: T) {
    this.#listener.get(event)?.forEach(f => f(params));
  }

  public remove(event: string, handler: Function) {
    if (this.#listener.has(event)) {
      this.#listener.get(event)?.delete(handler)
    }

    if (!this.#listener.get(event)?.size) {
      this.#listener.delete(event)
    }
  }
}

export default EventEmitter;
