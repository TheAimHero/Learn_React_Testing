import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import App from './App';

test('the entire component', async () => {
  render(<App />);
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /submit/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  user.click(nameInput);
  user.keyboard('v');

  user.click(emailInput);
  user.keyboard('v@g.com');

  user.keyboard('{Enter}');

  await waitFor(() => {
    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(1);
    items.forEach((item, index) => {
      const [name, email] = item.textContent
        .split('-->')
        .map((item) => item.trim());
      expect(name).toBe('v');
      expect(email).toBe('v@g.com');
    });
  });
});
