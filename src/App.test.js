import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Thurlo Trades/i);
  expect(linkElement).toBeInTheDocument();
});
