export type EventHandler<T> = (payload: T) => void;

export class EventBus<Events extends Record<string, unknown>> {
  private handlers = new Map<keyof Events, Set<EventHandler<Events[keyof Events]>>>();

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    const set = this.handlers.get(event) ?? new Set();
    set.add(handler as EventHandler<Events[keyof Events]>);
    this.handlers.set(event, set);
    return () => set.delete(handler as EventHandler<Events[keyof Events]>);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const handler of set) {
      handler(payload);
    }
  }

  clear() {
    this.handlers.clear();
  }
}
