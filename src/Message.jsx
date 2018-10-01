import React from 'react';

function Message ({data}) {
  if (data.type === "incomingMessage"){
  return(<div className="message">
          <span className="message-username">{data.username}</span>
          <span className="message-content">{data.content}</span>
        </div>);
  }
  return (<div className="message system">
            {data.content}
          </div>);
}

export default Message;
