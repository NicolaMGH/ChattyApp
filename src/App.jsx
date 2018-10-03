import React, {Component} from 'react';
import {Chatbar, Navbar} from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import messages from './messages.json';
// import { generateRandomId } from './helper';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      count: 0,
      color: ''
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001/", "protocolOne");
    this.socket.onopen = (event) => {
      console.log('connected to server')
    }
    this.socket.onmessage = (e) => {
      //checks to see if this is the color hex
      if (e.data[0] === '#') {
        this.setState({ color: e.data });
      } else {
        //if not color then parse and continue
        const data = JSON.parse(e.data);
        if (typeof data === "number") {
          this.setState({count: data})
        } else {
          const old = this.state.messages;
          const newMsg = [...old, data]

          switch(data.type) {
            // handle incoming message and notification
          case "incomingMessage":
          case "incomingNotification":
            this.setState({ messages: newMsg });
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
          }
        }
      }
    }
  }

  _newMessage = message => {
    const nM = {
      type: "postMessage",
      content: message,
      username: this.state.currentUser.name,
      color: this.state.color
    }
    this.socket.send(JSON.stringify(nM));
  }

  _changeUsername = name => {
    this.setState({currentUser: {name}})
    const noti = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${name}.`
    }
    this.socket.send(JSON.stringify(noti));
  }

  render() {
    return (
      <div>
        <Navbar online={this.state.count} />
        <MessageList data={this.state.messages} />
        <Chatbar user={this.state.currentUser.name} userChange={this._changeUsername} newMessage={this._newMessage} />
      </div>
    );
  }
}

export default App;
