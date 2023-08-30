import { render, screen } from '@testing-library/react';

import RepositoriesSummary from './RepositoriesSummary';

test('Display info about repository', () => {
  const repository = {
    language: 'JavaScript',
    stargazers_count: 100,
    forks: 102,
    open_issues: 101,
  };

  render(<RepositoriesSummary repository={repository} />);

  Object.entries(repository).forEach(([key, value]) => {
    const regex = new RegExp(value, 'i');
    const elements = screen.getAllByText(regex);
    elements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});
