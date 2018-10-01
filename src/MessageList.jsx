import React from 'react';
import Message from './Message.jsx';

function MessageList({data}){
  const mList = data.map(message => (
        <Message data={message}/>
      ));
  return (  <main className="messages">
              {mList}
            </main>);
}

export default MessageList;