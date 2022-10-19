import { assert } from 'chai';
import { BaseBlock } from './index';

const JSDOM = require('jsdom-global');

JSDOM('<div id="root"/>', { url: 'http://localhost:3000' });

describe('Компонент BaseBlock', () => {
  const divContent = 'Some content with name';
  const propValue = 'firstName';
  const newPropValue = 'secondName';

  class BaseBlockFake extends BaseBlock {
    constructor(props?: Record<string, unknown>) {
      super('div', props);
    }

    render() {
      return `<div name=${this.props.name}>${divContent}</div>`;
    }
  }

  it('отображается', () => {
    new BaseBlockFake();
  });

  const baseBlockFake = new BaseBlockFake({
    name: propValue,
  });
  describe('взаимодействие с пропсами', () => {
    it('добавляются параметры', () => {
      assert.equal(baseBlockFake.props.name, propValue);
    });

    it('изменяются параметры', () => {
      baseBlockFake.setProps({
        name: newPropValue,
      });
      assert.equal(baseBlockFake.props.name, newPropValue);
    });
  });

  describe('параметры отображения', () => {
    it('синхранизация параметров с отображением', () => {
      const res = baseBlockFake.getContent().innerHTML;
      assert.equal(res, `<div name="${newPropValue}">${divContent}</div>`);
    });
  });
});
