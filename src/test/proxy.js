const data = {
  test: 1,
};

const proxyData = new Proxy(data, {
  get(target, prop) {
    const value = target[prop];
    return typeof value === 'function' ? value.bind(target) : value;
  },
  // set(target, p, value) {
  //   target[p] = value;
  //   console.log(p, ':', value);
  //   return true;
  // },
});

const getData = proxyData.test;
const newData = proxyData.test = 15;
newData;
console.log(proxyData.test);

const newProperty = proxyData.jest = 'fine';
