import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import randomstring from "randomstring";

import Base62Str from "base62str";
import CryptoJS from "crypto-js";

import "./App.css";

const base62 = Base62Str.createInstance();

const MessageInput = ({ socket }) => {
  const [value, setValue] = useState("");
  const re = "12345";
  const submitForm = (e) => {
    e.preventDefault();
    const text = CryptoJS.AES.encrypt(value, re).toString();
    socket.emit("message", { value: text, key: base62.encodeStr(re) });
    setValue("");
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        console.log(newMessages);
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message, i) => (
          <div
            key={i}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            {message.user !== undefined && (
              <span className="user">{message.user}:</span>
            )}
            <span className="message">
              {message.key
                ? CryptoJS.AES.decrypt(
                    message.value,
                    base62.decodeStr(message.key)
                  ).toString(CryptoJS.enc.Utf8)
                : message.value}
            </span>
            <span className="date">
              {new Date(message.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
}

function App() {
  const [socket, setSocket] = useState(null);
  const [userState, setUser] = useState("");
  const [usersState, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    newSocket.on("init", init);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const init = (data) => {
    const { name, users } = data;
    setUser(name);
    setUsers(users);
    console.log(name, users);
  };

  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
