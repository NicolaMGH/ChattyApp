import React from 'react';

const imageUrl = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg)/;

//handles incoming messages and check whether it is a link or
//a string and returns the proper html
function handleImg(arr) {

    arr = arr.map((string, index) => {
      if (string.match(imageUrl)) {
        return (<img key="index" className="picture" src={string} />);
      } else {
          return (string + " ");
      }
    });
  return arr
}

function Message ({data}) {
  const style = { color: data.color };
  if (data.type === "incomingMessage"){
    return(<div className="message">
            <span style={style} className="message-username">{data.username}</span>
            <span className="message-content">{data.content}</span>
          </div>);
  } else if (data.type === "incomingNotification") {
      return (<div className="message system">
               {data.content}
             </div>);
  } else if (data.type === "incomingMessageImg") {
      return (<div className="message">
                <div className="userdiv">
                  <span style={style} className="message-username">{data.username}</span>
                </div>
                <div>
                  <span className="message-content">{handleImg(data.content)}</span>
                </div>
              </div>);
  }
}

export default Message;
