import React, { useState } from 'react';

export default function UserForm(props) {
  const { onSubmit } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, email });
    setName('');
    setEmail('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex gap-5 flex-col'>
        <div className='flex gap-4'>
          <label htmlFor='name'>Name</label>
          <input
            className='rounded-sm'
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex gap-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            className='rounded-sm'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit' className='rounded-sm bg-blue-500'>
          Submit
        </button>
      </form>
    </div>
  );
}
