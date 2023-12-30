import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/THE CATS/i);
  expect(linkElement).toBeInTheDocument();
});
test('autocomplete selector rendered', () => {
  render(<App />);
  const input = screen.getByRole('combobox');
  expect(input).toBeInTheDocument();
})