class EventEmitter {
  #listener = new Map<string, Array<Function>>();

  public on(event: string, handler: Function) {
    this.#listener.set(event, [
      ...this.#listener.get(event) ?? [],
      handler
    ])
  }

  public emit<T>(event: string, params?: T) {
    this.#listener.get(event)?.forEach(f => f(params));
  }

  public remove(event: string, handler: Function) {
    if (this.#listener.has(event)) {
      this.#listener.set(event, this.#listener.get(event)?.filter(f => f!== handler) ?? [])
    }

    if (!this.#listener.get(event)?.length) {
      this.#listener.delete(event)
    }
  }
}

export default EventEmitter;
