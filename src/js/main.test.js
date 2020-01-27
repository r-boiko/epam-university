import {a} from './main';

describe('Test for a function', () => {
  describe('It should return 1 after call', () => {
    it('aa', () => {
      expect(a()).toBe(1);
    });
  });
});
