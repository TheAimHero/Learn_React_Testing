import { screen, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import RepositoriesListItem from './RepositoriesListItem';

jest.mock('../tree/FileIcon.js', () => {
  return () => {
    return `don't render this `;
  };
});

async function renderComponent() {
  const repository = {
    language: 'JavaScript',
    stargazers_count: 100,
    forks: 102,
    open_issues: 101,
    html_url: 'https://google.com',
    full_name: 'google/google',
    owner: { login: 'google' },
  };

  render(<RepositoriesListItem repository={repository} />, {
    wrapper: MemoryRouter,
  });

  return { repository };
}

test('Display the link to the repo', async () => {
  const { repository } = await renderComponent();
  const link = await screen.findByRole('link', { name: /github repository/ });

  expect(link).toHaveAttribute('href', repository.html_url);
});

test('Display appropriate icon', async () => {
  renderComponent();
  const link = await screen.findByRole('link', { name: /github repository/ });
  const icon = await within(link).findByRole('img', { hidden: true });

  expect(icon).toHaveClass('octicon-mark-github');
});
