import { render, screen } from '@testing-library/react';
import MiniEcommerce from './Mini-ecommerce';

describe('Teste componente mini-ecommerce', () => {

  it('Deve redenrizar sem erros', () => {
    render(<MiniEcommerce />);
    const linkElement = screen.getByText(/checkout/i);
    expect(linkElement).toBeInTheDocument();
  });

});
