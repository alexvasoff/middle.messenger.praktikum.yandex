import { Input } from './index';

describe.only('Input', () => {
  it('отображается ', () => {
    // const buttonName = 'testName';
    // const buttonText = 'hello test';
    // const buttonType = 'text';
    new Input({ name: 'login', label: 'test', placeholder: 'q' });
  });
});
