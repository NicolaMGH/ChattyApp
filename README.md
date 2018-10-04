ChattyApp
=====================

A single page app that uses React, Websockets, Webpack and Babel for multi-user real-time updates. No database is involved in this app; the focus is on the client-side experience.

### Getting Started

1. Clone this repo and install all dependencies.

```
git clone https://github.com/NicolaMGH/ChattyApp.git
cd into ChattyApp
npm install
cd into chatty_server
npm install
```

2. Start and run the application:

```
cd into ChattyApp and run 'npm start'
cd into chatty_server and run 'npm start'
open browser to http://localhost:3000
```
> The application default websocket server address is *ws://localhost:3001*;

### Features

- Realtime messages between all clients.
- Messages is saved locally on each clients state; no persistent messages on server.
- Auto scroll on new message.
- Ablity to send images
- Each user is assigned a unique color represented on the username.

### Final Product

!["chattyapp"](https://github.com/NicolaMGH/ChattyApp/blob/master/docs/chattyapp.png?raw=true)
!["chattyappgif"](https://github.com/RayKayy/hichat-app/blob/master/docs/hichat_demo.png?raw=true)

### Dependencies

- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- babel-preset-stage-0
- css-loader
- eslint
- eslint-plugin-react
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- randomcolor
- react
- react-dom
- uuid
- express
- ws