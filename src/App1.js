import "./App.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";

import UsersList from "./components/UsersList";
import ChangeNameForm from "./components/ChangeNameForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketCreated, setSocketCreated] = useState(false);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socketCreated) {
      console.log(socketCreated);
      var socketA = io.connect("localhost:3002");
      socketA.on("init", _initialize);
      socketA.on("send:message", _messageRecieve);
      socketA.on("user:join", _userJoined);
      socketA.on("user:left", _userLeft);
      socketA.on("change:name", _userChangedName);
      setSocket(socketA);
      setSocketCreated(true);
    }
    return socket.close();
  }, []);

  const _initialize = (data) => {
    var { users, name, key } = data;
    setUsers(users);
    setUser(name);
  };

  const _messageRecieve = (message) => {
    const newMessages = messages;
    newMessages.push(message);
    setMessages(newMessages);
  };

  const _userJoined = (data) => {
    const newUsers = users;
    const newMessages = messages;
    const { name } = data;
    newUsers.push(name);
    newMessages.push({
      user: "APPLICATION BOT",
      text: name + " Joined",
    });
    setUsers(newUsers);
    setMessages(newMessages);
  };

  const _userLeft = (data) => {
    const newUsers = users;
    const newMessages = messages;
    const { name } = data;
    const index = newUsers.indexOf(name);
    newUsers.splice(index, 1);
    newMessages.push({
      user: "APPLICATION BOT",
      text: name + " Left",
    });
    setUsers(newUsers);
    setMessages(newMessages);
  };

  const _userChangedName = (data) => {
    const { oldName, newName } = data;
    const newUsers = users;
    const newMessages = messages;
    var index = newUsers.indexOf(oldName);
    newUsers.splice(index, 1, newName);
    newMessages.push({
      user: "APPLICATION BOT",
      text: "Change Name : " + oldName + " ==> " + newName,
    });
    setUsers(newUsers);
    setMessages(newMessages);
  };

  const handleMessageSubmit = (message) => {
    const newMessages = messages;
    newMessages.push(message);
    setMessages(newMessages);
    socket.emit("send:message", message);
  };

  const handleChangeName = (newName) => {
    var oldName = user;
    socket.emit("change:name", { name: newName }, (result) => {
      if (!result) {
        return alert("Ocurrió un error al cambiar el nombre");
      }
      const newUsers = users;
      var index = newUsers.indexOf(oldName);
      newUsers.splice(index, 1, newName);
      setUsers(newUsers);
      setUser(newName);
    });
  };

  return (
    <div className="App">
      <div className="chat-area">
        <h1>Conversación</h1>
        {socket ? (
          <>
            <MessageList socket={socket} />
            <MessageForm
              socket={socket}
              onMessageSubmit={handleMessageSubmit}
            />
          </>
        ) : (
          <>No hay conexión</>
        )}
      </div>
      <div className="users-area">
        <h1>Lista de usuarios</h1>
        {socket ? (
          <>
            <UsersList socket={socket} />
            <ChangeNameForm socket={socket} onChangeName={handleChangeName} />
          </>
        ) : (
          <>No hay conexión</>
        )}
      </div>
    </div>
  );
};

export default App;
