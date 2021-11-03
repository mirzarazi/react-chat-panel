// A mock function to mimic making an async request for data
const postMessage = (payload) => new Promise((resolve) => {
  const messages = [
    'do I know you?',
    'who are you?',
    'do you know me?',
    'when did we get in contact?',
  ];
  return setTimeout(() => resolve({
    data: { id: payload.id, message: messages[Math.floor(Math.random() * messages.length)] },
  }), 1000 + Math.random() * 1000);
});

export default postMessage;
