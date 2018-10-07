import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      count: 0,
      color: ''
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

    this.socket = new WebSocket("ws://localhost:3001/", "protocolOne");
    this.socket.onopen = (event) => {
      console.log('connected to server');
    };
    this.socket.onmessage = (e) => {
     const data = JSON.parse(e.data);
        // handle incoming data
      switch(data.type) {
      case "userColor":
        this.setState({ color: data.color });
        break;
      case "userCount":
        this.setState({count: data.count});
        break;
      case "incomingMessage":
      case "incomingNotification":
      case "incomingMessageImg":
        const old = this.state.messages;
        const newMsg = [...old, data];
        this.setState({ messages: newMsg }, scrollToBottom);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
    };
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
