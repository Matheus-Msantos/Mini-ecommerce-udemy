import { render, screen } from '@testing-library/react';
import MiniEcommerce from './Mini-ecommerce';

test('renders learn react link', () => {
  render(<MiniEcommerce />);
  const linkElement = screen.getByText(/Mini ecommerce/i);
  expect(linkElement).toBeInTheDocument();
});
