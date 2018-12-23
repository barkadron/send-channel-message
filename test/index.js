import chai from 'chai';
// import { mocks } from 'mock-browser';

import sendChannelMessage from '../src/index';

describe('sendChannelMessage', () => {
  it('must be a function', () => {
    chai.assert.isFunction(sendChannelMessage);
  });
/*
  @todo:
  // https://wietse.loves.engineering/testing-promises-with-mocha-90df8b7d2e35
  it('must return a promise', async () => {
    const window = new mocks.MockBrowser().getWindow();
    const result = await sendChannelMessage({ message: 'hello!', target: window });
    chai.expect(result).to.equal('promise resolved');
  });
*/
});
