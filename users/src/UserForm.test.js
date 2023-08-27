import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import UserForm from './UserForm';

function getElements(mock) {
  render(<UserForm onSubmit={mock} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  return { nameInput, emailInput, button };
}

test('Check the form structure', () => {
  const { nameInput, emailInput, button } = getElements();

  expect(button).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test('Handle the submit of the form', () => {
  const mock = jest.fn();

  const { nameInput, emailInput, button } = getElements(mock);

  user.click(nameInput);
  user.keyboard('v');

  user.click(emailInput);
  user.keyboard('v@g.com');

  user.click(button);

  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith({ name: 'v', email: 'v@g.com' });
});

test('Clear the form on submit', async () => {
  const mock = jest.fn();
  const { nameInput, emailInput, button } = getElements(mock);

  user.click(nameInput);
  user.keyboard('v');

  user.click(emailInput);
  user.keyboard('v@g.com');

  user.click(button);

  await waitFor(() => {
    expect(nameInput).toHaveValue('');
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(emailInput).toHaveValue('');
  });
});
