import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const SocketContext = React.createContext();

const socketReducer = (socketState, action) => {
  switch (action.type) {
    case "set":
      return {
        socket: action.to,
      };
    case "socket":
      return {
        socket: action.socket,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SocketProvider = ({ children }) => {
  const [socketState, setSocketState] = React.useReducer(socketReducer, {
    socket: {},
  });

  const value = { socketState, setSocketState };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined)
    throw new Error("socketContext must be used within a Provider");
  return context;
};

export { SocketProvider, useSocket };
