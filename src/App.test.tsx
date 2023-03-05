import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainAppBar } from './App';

test('renders learn react link', () => {
  render(<MainAppBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
