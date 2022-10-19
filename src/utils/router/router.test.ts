import { expect } from 'chai';
import { Router } from './router';

const router = new Router('#root');

describe('Роутер', () => {
  it('', () => {
    router.start();
    expect(1).to.eq(1);
  });
});
