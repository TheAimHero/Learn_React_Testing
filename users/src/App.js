import React, { useState } from 'react';

import UserForm from './UserForm';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);

  function handleAddUser(user) {
    setUsers((prevState) => {
      const newArr = [...prevState, user];
      return newArr;
    });
  }

  return (
    <div className='flex flex-row bg-slate-400 gap-[20rem] items-center justify-center h-screen'>
      <UserList users={users} />
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
}

export default App;
