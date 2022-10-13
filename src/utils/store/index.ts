import { EventBus } from '../eventBus';

class Store extends EventBus {
  private state: Record<string, unknown> = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const keys = path.split('.').reduceRight((acc, key) => ({ [key]: acc }), value);
    Object.assign(this.state, keys);
  }
}

const store = new Store();
export { store };
