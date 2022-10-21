import { EventBus } from '../eventBus';
import { UserData } from '../../api/types';

export enum StoreEvents {
  newMessages = 'newMessages',
}

export interface State {
  me: UserData;
  chatSocket: WebSocket;
  messages: Array<any>;
}

class Store extends EventBus {
  private state = {} as State;

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const keys = path.split('.').reduceRight((acc, key) => ({ [key]: acc }), value);
    Object.assign(this.state, keys);
  }

  public setMessages(messages: Array<any>) {
    this.set('messages', messages);
    this.emit(StoreEvents.newMessages, messages);
  }

  public addMessage(message: any) {
    this.state.messages.push(message);
    this.emit(StoreEvents.newMessages, this.state.messages);
  }
}

const store = new Store();
export { store };
