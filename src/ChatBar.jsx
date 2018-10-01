import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
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