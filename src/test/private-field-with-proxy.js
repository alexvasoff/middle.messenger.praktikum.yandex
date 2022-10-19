const data = {
  _test: 1,
};

const proxyData = new Proxy(data, {
  get(target, prop) {
    if (prop.indexOf('_') === 0) {
      throw new Error('Отказано в доступе');
    }

    const value = target[prop];
    return typeof value === 'function' ? value.bind(target) : value;
  },
  deleteProperty() {
    throw new Error('Отказано в доступе');
  },
});

proxyData._test; // Error: Отказано в доступе
proxyData.newProp = 'string'; // Не дойдёт сюда
console.log(proxyData.newProp);
