class EventBus {
  listeners: {} = {};

  // constructor() {
  // }
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Event('Нет события:', event);
    }
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Event('Нет события:', event);
    }
    this.listeners[event].forEach(cb => cb(...args));
  }
}

export { EventBus };
