const checkInputsIsInvalid = (message, target) => {
  if (!(target && typeof target.postMessage === 'function')) {
    return new Error('Error! Invalid target.');
  }

  if (!message) {
    return new Error('Error! Invalid message.');
  }

  return null;
};

const sendChannelMessage = (message, target, origin = '*') => (
  new Promise((resolve, reject) => {
    const error = checkInputsIsInvalid(message, target);
    if (error) {
      reject(error);
    }

    const {
      port1,
      port2,
    } = new MessageChannel();

    port1.onmessage = (evt) => {
      port1.close();
      resolve(evt.data);
    };

    target.postMessage(message, origin, [port2]);
  })
);

export default sendChannelMessage;
