import React, {Component} from 'react';

class Chatbar extends Component {
  render(){
  const onKeyPress = event => {
    if (event.key === 'Enter'){
      this.props.newMessage(event.target.value);
      event.target.value = '';
    }
  }
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
    </footer>
    );
  }
}

class Navbar extends Component {
  render() {
    return(<nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
    );
  }
}

export {Chatbar, Navbar};