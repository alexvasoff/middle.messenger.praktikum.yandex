import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './router';
import { BlockConstructor } from './route';

const router = new Router('#root');

describe('Роутер', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const hideFake = sinon.fake.returns(1);
  const showFake = sinon.fake.returns(2);
  const dispatchComponentDidMountFake = sinon.fake.returns(true);

  const BlockMock = class {
    getContent = getContentFake;

    hide = hideFake;

    show = showFake;

    dispatchComponentDidMount = dispatchComponentDidMountFake;
  } as unknown as BlockConstructor;

  describe('use()', () => {
    it('возвращает объект Router ', () => {
      const result = router.use('/', BlockMock);

      expect(result).to.eq(router);
    });
  });

  describe('.back()', () => {
    it('отображает предыдущую страницу', () => {
      router.use('/', BlockMock);
      router.start();

      router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('отображает страницу на метод start()', () => {
    router.use('/', BlockMock);
    router.start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
