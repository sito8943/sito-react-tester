const UsersList = (props) => {
  return (
    <ul className="users-list">
      {props.users.map((user, i) => {
        return <li key={i}>{user}</li>;
      })}
    </ul>
  );
};

export default UsersList;
