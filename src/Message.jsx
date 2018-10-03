import React from 'react';

function Message ({data}) {
  if (data.type === "incomingMessage"){
    const style = { color: data.color }
  return(<div className="message">
          <span style={style} className="message-username">{data.username}</span>
          <span className="message-content">{data.content}</span>
        </div>);
  }
  return (<div className="message system">
            {data.content}
          </div>);
}

export default Message;
