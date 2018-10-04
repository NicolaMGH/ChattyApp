// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
var randomColor = require('randomcolor');

// records assigned colors
const usedColors = [];
// Generate a unique color for new users so the same color is not used in the same chat
const diffColor = () => {
  let newC = randomColor();
  while (usedColors.includes(newC)) {
    newC = randomColor();
  }
  return newC;
}

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const imageUrl = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg)/;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // New user detected
  // Generate and send a random color for each new client.
  const color = {
    type: "userColor",
    color: diffColor()
  };
  usedColors.push(color);
  ws.send(JSON.stringify(color));

  // broadcast user count
  wss.clients.forEach((client) => {
    const online = {
      type: "userCount",
      count: wss.clients.size
    };
    client.send(JSON.stringify(online));
  });

  ws.on('message', messages => {
    const m = JSON.parse(messages);
    switch (m.type){
      case "postMessage":
        if (m.content.match(imageUrl)) {
          m.content = m.content.split(' ')
          m.type = "incomingMessageImg";
          m.id = uuidv4();
        } else {
          m.type = "incomingMessage";
          m.id = uuidv4();
        }
        break;
      case "postNotification":
        m.id = uuidv4();
        m.type = "incomingNotification";
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error(`Unknown message type ${m.type}`);
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
  ws.on('close', () => {
    console.log('Client disconnected');
    usedColors.splice(usedColors.indexOf(color), 1);
    // Broadcast new user count
    wss.clients.forEach((client) => {
      const online = {
        type: "userCount",
        count: wss.clients.size
      };
      client.send(JSON.stringify(online));
    });
  });
});
