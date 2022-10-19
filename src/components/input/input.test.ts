import { expect } from 'chai';
import { Input } from './index';

describe.only('Input', () => {
  const inputName = 'phone';
  const inputLabel = 'testLabel';
  const inputPlaceholder = 'text';

  it('отображается ', () => {
    new Input({ name: inputName, label: inputLabel, placeholder: inputPlaceholder });
  });

  it('возвращает блок', () => {
    const input = new Input({ name: inputName, label: inputLabel, placeholder: inputPlaceholder });
    const { element } = input;

    expect(element).to.be.instanceof(window.HTMLDivElement);
  });
});
