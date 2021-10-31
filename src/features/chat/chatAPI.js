// A mock function to mimic making an async request for data
export function fetchMessage() {
  return new Promise((resolve) =>{
    const messages = [
      'do I know you?',
      'who are you?',
      'do you know me?',
      'when did we get in contact?'
    ]
    return setTimeout(() => resolve({ data: messages[Math.floor(Math.random() * messages.length)]}), 1000 + Math.random() * 1000)
  }
    
  );
}
