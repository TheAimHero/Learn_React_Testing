import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import createServer from '../../util/createServer';
import AuthButtons from './AuthButtons';

async function renderComponent() {
  render(<AuthButtons />, { wrapper: MemoryRouter });

  // atleast one auth button will always will be visible
  // when user is signed in then we will have sign out button visible
  // and when user is not signed in then we will have sign in and sign up button visible
  const authButtons = await screen.findAllByRole('link', { name: /sign/i });

  return { authButtons };
}

// function pause() {
//   return new Promise(resolve => setTimeout(resolve, 1000));
// }

describe('when user is not signed in', () => {
  // createServer() ---> GET '/api/user' ---> { user: null }
  createServer([{ path: '/api/user', res: () => ({ user: null }) }]);

  test('sign in and sign up are visible', async () => {
    const { authButtons } = await renderComponent();
    expect(authButtons).toHaveLength(2);

    const signInButton = await screen.findByRole('link', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/signin');

    const signUpButton = await screen.findByRole('link', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });

  test('when user is not signed in, sign out is not visible', async () => {
    await renderComponent();

    const logOutButton = screen.queryByRole('link', {
      name: /sign out/i,
    });
    expect(logOutButton).not.toBeInTheDocument();
  });
});

describe('when user is signed in', () => {
  // createServer() ---> GET '/api/user' ---> {
  //   user: { id: 3, email: 'asdf@a.com' },
  // }
  const userObj = { id: 3, email: 'asdf@asdf.com' };

  createServer([
    {
      path: '/api/user',
      res: () => ({ user: userObj }),
    },
  ]);

  test('sign in and sign up are not visible', async () => {
    renderComponent();

    const signInButton = screen.queryByRole('link', { name: /sign in/i });
    expect(signInButton).not.toBeInTheDocument();

    const signUpButton = screen.queryByRole('link', { name: /sign up/i });
    expect(signUpButton).not.toBeInTheDocument();
  });

  test('sign out is visible', async () => {
    await renderComponent();

    const logOutButton = screen.queryByRole('link', { name: /sign out/i });
    expect(logOutButton).toBeInTheDocument();
    expect(logOutButton).toHaveAttribute('href', '/signout');
  });
});
