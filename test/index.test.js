import chai from 'chai';

import sendChannelMessage from '../src/index';


/* MessageChannel mock */
global.port1 = {
  close: () => null,
};

global.port2 = {
  // "send" request message back
  sendResponse: (message, origin) => global.port1.onmessage({ data: message, origin }),
};

global.MessageChannel = () => ({
  port1: global.port1,
  port2: global.port2,
});

/* target mock */
const target = {
  postMessage: (message, origin, [port2]) => port2.sendResponse(message, origin),
};

const testMessage = 'test message';


/* test cases */
describe('sendChannelMessage', () => {
  it('must be a function.', () => chai.assert.isFunction(sendChannelMessage));

  it('must rejects if input \'target\' is wrong.', () => sendChannelMessage(testMessage, null)
    .catch(error => chai.assert.equal(error.message, 'Error! Invalid target.')));

  it('must rejects if input \'message\' is wrong.', () => sendChannelMessage(null, target)
    .catch(error => chai.assert.equal(error.message, 'Error! Invalid message.')));

  it('must resolves and get response message.', () => sendChannelMessage(testMessage, target)
    .then(result => chai.assert.equal(result, testMessage)));
});
