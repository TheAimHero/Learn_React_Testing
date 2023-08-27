import React from 'react';

export default function UserList(props) {
  const { users } = props;

  const usersArr = users.map((user, index) => {
    const str = user.name + '-->' + user.email;
    return (
      <li key={index}>
        <span>{str}</span>
      </li>
    );
  });

  return (
    <div>
      <ul>{usersArr}</ul>
    </div>
  );
}
