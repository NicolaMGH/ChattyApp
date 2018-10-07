import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  render(){
  const onMsgPress = event => {
    if (event.key === 'Enter'){
      this.props.newMessage(event.target.value);
      event.target.value = '';
    }
  };

  const onUserPress = event => {
    if (event.key === 'Enter'){
      this.props.userChange(this.state.name);
    }
  };
  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        onChange={this.handleChange}
        onKeyPress={onUserPress}
      />
      <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={onMsgPress}
      />
    </footer>);
  }
}

export default Chatbar;