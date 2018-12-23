# send-channel-message

[![Build status][travis-image]][travis-url]
[![License][license-image]][license-url]

This package provide simple function that allow to pass messages to separate script in different browsing context and get back result data as a Promise using _Channel Messaging API_.

## Motivation

If you just want to communicate with script in other window/iframe/worker, you can use postMessage function and onMessage event handler.

But if you want to communicate in Promise style, so thats a problem. And [Channel Messaging API][channel-messaging-api-url] solves this problem using two-way channels with a port at each end.

## Installation

Install the package to your project:

``` sh
npm install --save send-channel-message
```

And then you can import the function:

* If you used ES modules:
    ``` js
    import sendChannelMessage from 'send-channel-message';
    ```

* If you used it in CommonJS environment (don’t forget to add `.default` to your import):
    ``` js
    var sendChannelMessage = require('send-channel-message').default;
    ```

* Additionally it's also support a [UMD build][umd-build-min-url]:
    ```js
    var sendChannelMessage = window.sendChannelMessage.default;
    ```

## Usage

Basically it's a function that takes 3 inputs and return a Promise:

``` js
const promise = sendChannelMessage(message, target, origin);
```

When Promise resolves it return object with response data:

``` js
promise.then( (data) => {
    console.log(data);
});
```

### Inputs

* **message** - data to be sent to the other script.

* **target** - a reference to the window/worker that will receive the `message`.

* **origin** - specifies what the origin of `target` must be for the event to be dispatched  (default = "*").

*See [postMessage syntax][post-message-syntax-url] description.

### Outputs

`data` property of the `MessageEvent` interface.

*See [MessageEvent data][message-event-data-url] description.

## Example

You can create a module for communicating with some iFrame using `send-channel-message` like this:

``` js
/* iframeCommunicator.js */

import sendChannelMessage from 'send-channel-message';

const target = document.getElementById('someIframe').contentWindow;

function sendMessageToIframe(message) {
    return sendChannelMessage(message, target);
}

export default {
    initialize: (initData) => {
        const message = {
            type: 'INIT',
            initData
        };
        return sendMessageToIframe(message);
    },
    // ...
};
```

And then use it for simple send requests and receive responses in API-like style:

``` js
/* index.js */

import iframeCommunicator from './iframeCommunicator';

// ...

iframeCommunicator.initialize('very important data')
    .then( (data) => {
        console.log('Received init response:', data);
    });

// ...
```

The iFrame script will look something like this:

``` js
/* iframe.js */

window.addEventListener('message', evt => {
    if (evt.data && evt.ports && evt.ports[0]) {
        if (evt.data.type === 'INIT') {
            const { initData } = evt.data;
            ports[0].postMessage('Init success!', '*');
        }
    }
});
```

## Tests

Simply clone the repo and run

``` sh
npm install
```

``` sh
npm test
```

## License

MIT

[travis-image]: https://img.shields.io/travis/barkadron/send-channel-message.svg?style=flat-square
[travis-url]: https://travis-ci.org/barkadron/send-channel-message
[license-image]: http://img.shields.io/npm/l/safe-publish-latest.svg
[license-url]: LICENSE
[channel-messaging-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
[post-message-syntax-url]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Syntax
[message-event-data-url]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/data
[umd-build-min-url]: /dist/send-channel-message.min.js
