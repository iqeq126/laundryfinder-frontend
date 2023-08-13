import { render, screen } from '@testing-library/react';
import App from './App';
import CRUD from './CRUD';

test('renders learn react link', () => {
  render(<App />);
  render(<CRUD />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
