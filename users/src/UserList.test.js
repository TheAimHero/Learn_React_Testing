import { render, screen } from '@testing-library/react';

import UserList from './UserList';

test('Check the list structure', () => {
  const users = [
    { name: 'v', email: 'v@g.com' },
    { name: 'v', email: 'v@g.com' },
  ];

  render(<UserList users={users} />);

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(users.length);
  items.forEach((item, index) => {
    const [name, email] = item.textContent
      .split('-->')
      .map((item) => item.trim());
    expect(name).toBe(users[index].name);
    expect(email).toBe(users[index].email);
  });
});
