import React, {Component} from 'react';
import {Chatbar, Navbar} from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messages from './messages.json';
import { generateRandomId } from './helper';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001/", "protocolOne");
    this.socket.onopen = (event) => {
      console.log('connected to server')
    }
    this.socket.onmessage = (e) => {
    // code to handle incoming message
      const old = this.state.messages;
      const newMsg = [...old, JSON.parse(e.data)]
      this.setState({ messages: newMsg })
    }
  }

  _newMessage = message => {
    const nM = {
      type: "incomingMessage",
      content: message,
      username: this.state.currentUser.name
    }
    this.socket.send(JSON.stringify(nM));
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList data={this.state.messages} />
        <Chatbar user={this.state.currentUser.name} newMessage={this._newMessage} />
      </div>
    );
  }
}
export default App;
