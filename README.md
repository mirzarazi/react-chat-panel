# Chat Panel Challenge
This is a chat panel that has been developed on [React](https://reactjs.org/) and [Redux](https://redux.js.org/) bootstraped with [Create React App](https://github.com/facebook/create-react-app).  
Chat UI kit that has been used in this project is from [chat-ui-kit-react](https://github.com/chatscope/chat-ui-kit-react).

## How it works
### Requiements
Developement
* Node 12

Production
* Docker

### How to run
development
```
yarn
yarn start
```
production
```
docker build . -t chat_panel
docker run -p 3000:80 chat_panel
```
1. Navigate to [http://localhost:3000/](http://localhost:3000/)
2. Start the exciting chat

### Test
Unit tests has been developed
```
yarn test
```

# Future improvements
* Increasing test coverage
* Typechecking with Proptype
* Implementing logging systems
* Implementing Next.js
* Configuring CI/CD

Ehsan Mirzarazi
