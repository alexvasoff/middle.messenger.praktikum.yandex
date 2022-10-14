type Event = string;
type Callback = (...args: unknown[]) => void;

class EventBus {
  listeners: Record<string, Callback[]> = {};

  // constructor() {
  // }
  on(event: Event, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: Event, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события:', ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event: Event, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события:', ${event}`);
    }
    this.listeners[event].forEach(cb => cb(...args));
  }
}

export { EventBus };
