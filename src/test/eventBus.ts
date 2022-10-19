import { EventBus } from '../utils/eventBus';

const eventBus = new EventBus();

const callback = (...args) => {};

eventBus.on('myEvent', callback);

eventBus.emit('myEvent', 123, 'qwe', false);
eventBus.off('myEvent', callback);
eventBus.emit('myEvent', 123, 'qwe', false);
