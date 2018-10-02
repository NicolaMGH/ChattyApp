// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
var randomColor = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // const color = randomColor();
  // ws.send(color);

  wss.clients.forEach((client) => {
    client.send(wss.clients.size);
  });

  ws.on('message', messages => {
    const m = JSON.parse(messages);
    if (m.type === "postMessage") {
      m.id = uuidv4();
      m.type = "incomingMessage";
    } else if ("postNotification") {
      m.id = uuidv4();
      m.type = "incomingNotification";
    }
    wss.broadcast = data => {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(data);
        }
      });
    };
    wss.broadcast(JSON.stringify(m));
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});