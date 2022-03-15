import { useEffect, useState } from "react";
import Message from "./Message";

const MessageList = (props) => {
  const { socket } = props;
  const [messages, setMessages] = useState({});

  const _messageRecieve = (message) => {
    const newMessages = messages;
    newMessages.push(message);
    setMessages(newMessages);
  };

  socket.on("send:message", _messageRecieve);

  useEffect(() => {
    return () => {
      socket.off("send:message", _messageRecieve);
    };
  }, [socket]);

  return (
    <ul className="message-area">
      {props.messages.map((message, i) => {
        return <Message key={i} user={message.user} text={message.text} />;
      })}
    </ul>
  );
};

export default MessageList;
