import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

import Base62Str from "base62str";
import CryptoJS from "crypto-js";

import "./App.css";

const base62 = Base62Str.createInstance();
const re = nanoid();

const MessageInput = ({ socket }) => {
  const [value, setValue] = useState("");

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

const Users = ({ socket }) => {
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const [usersState, setUsersState] = useState([]);

  useEffect(() => {
    socket.on("init", init);
    return () => {
      socket.off("init", init);
    };
  }, [socket]);

  const init = (data) => {
    const { name, users } = data;
    setUserName(name);
    setUsersState(users);
  };

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("change:name", { name: value }, (result) => {
      if (!result) return alert("Ha ocurrido un error al cambiar el nombre");
      setUserName(value);
      setValue("");
    });
  };

  return (
    <div className="side-bar">
      <UsersList users={usersState} />
      <form onSubmit={submitForm}>
        <label htmlFor="change-name">
          Cambiar nombre (actual: {userName}):
        </label>
        <input
          id="change-name"
          autoFocus
          value={value}
          placeholder="Ej: Nombre2"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>
    </div>
  );
};

const Messages = ({ socket }) => {
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
};

const UsersList = ({ socket, users }) => {
  return (
    <ul className="users-list">
      <h4>Usuarios</h4>
      {users.map((user, i) => {
        return <li key={i}>{user}</li>;
      })}
    </ul>
  );
};

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <>
          <div className="chat-container">
            <Messages socket={socket} />
            <MessageInput socket={socket} />
          </div>
          <Users socket={socket} />
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
};

export default App;
