import { useState } from "react";

const MessageForm = (props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var message = {
      user: props.user,
      text: text,
    };
    props.onMessageSubmit(message);
    setText("");
  };

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="input-area">
      <h4>Escribir mensaje</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={changeHandler} value={text} />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default MessageForm;
