import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (socket === null) {
      io("http://localhost:8000");
      setCreated(true);
    }
    if (created) {
      console.log("hola");
      socket.on("init", _initialize);
      socket.on("send:message", _messageRecieve);
      socket.on("user:join", _userJoined);
      socket.on("user:left", _userLeft);
      socket.on("change:name", _userChangedName);
    }
  }, [socket]);

  const _initialize = (data) => {
    var { users, name } = data;
    setUser(name);
    setUsers([...users, name]);
  };

  const _messageRecieve = (message) => {
    setMessages([...messages, message]);
  };

  const _userJoined = (data) => {
    console.log("hola");
    var { name } = data;
    setUsers([...users, name]);
    setMessages([
      ...messages,
      { user: "APPLICATION BOT", text: `Se ha unido ${name}` },
    ]);
  };

  const _userLeft = (data) => {
    var { name } = data;
    setUsers([...users, name]);
    setMessages([
      ...messages,
      { user: "APPLICATION BOT", text: `${name} se ha ido` },
    ]);
  };

  const _userChangedName = (data) => {
    var { oldName, newName } = data;
    const newUsers = users;
    var index = users.indexOf(oldName);
    newUsers.splice(index, 1, newName);
    messages.push({
      user: "APPLICATION BOT",
      text: "Change Name : " + oldName + " ==> " + newName,
    });
    setMessages([
      ...messages,
      {
        user: "APPLICATION BOT",
        text: `${oldName} ha cambiado su nombre a ${newName}`,
      },
    ]);
    setUsers(newUsers);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, message]);
    setMessage("");
    socket.emit("send:message", message);
  };

  const changeName = (e) => {
    e.preventDefault();
    const oldName = user;
    socket.emit("change:name", { name: newName }, (result) => {
      if (!result) {
        return alert("Ha ocurrido un error al cambiar el nombre");
      }
      const newUsers = users;
      var index = users.indexOf(oldName);
      newUsers.splice(index, 1, newName);
      setUser(newName);
      setNewName("");
      setUsers(newUsers);
    });
  };

  return (
    <div className="App">
      <div className="chat-area">
        <h1>Conversación</h1>
        <ul className="message-area">
          {messages.map((item, i) => {
            return (
              <li key={`message${i}`}>
                <strong>{item.user}</strong>
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>
        <div className="input-area">
          <h4>Escrbir mensaje</h4>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </div>
      <div className="users-area">
        <h1>Lista de usuarios</h1>
        <ul className="users-list">
          {users.map((item, i) => {
            return <li key={`user${i}`}>{item}</li>;
          })}
        </ul>
        <div className="change-name-form">
          <h4>Usuario: {user}</h4>
          <form onSubmit={changeName}>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
            />
            <input type="submit" value="Cambiar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
