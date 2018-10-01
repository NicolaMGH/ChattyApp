import React, {Component} from 'react';
import {Chatbar, Navbar} from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messages from './messages.json';


class App extends Component {
  constructor(props) {
    super();
    this.state = { messages }
  }
  render() {
    return (
      <div>
        <Navbar />
        <MessageList data={this.state.messages} />
        <Chatbar />
      </div>
    );
  }
}
export default App;
