import { useState } from "react";

const ChangeNameForm = (props) => {
  const [newName, setNewName] = useState("");

  const onKey = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNewName = newName;
    props.onChangeName(newNewName);
    setNewName("");
  };

  return (
    <div className="change-name-form">
      <h4>Cambiar nombre</h4>
      <form onSubmit={handleSubmit}>
        <input onChange={onKey} value={newName} type="text" />
        <input type="submit" value="Cambiar" />
      </form>
    </div>
  );
};

export default ChangeNameForm;
