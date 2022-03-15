const Message = (props) => {
  return (
    <div className="message">
      <strong>{props.user} :</strong>
      <span>{props.text}</span>
    </div>
  );
};

export default Message;

