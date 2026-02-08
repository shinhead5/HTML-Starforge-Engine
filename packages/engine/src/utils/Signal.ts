export type SignalHandler<T> = (payload: T) => void;

export class Signal<T> {
  private handlers = new Set<SignalHandler<T>>();

  on(handler: SignalHandler<T>) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  emit(payload: T) {
    for (const handler of this.handlers) {
      handler(payload);
    }
  }

  clear() {
    this.handlers.clear();
  }
}
