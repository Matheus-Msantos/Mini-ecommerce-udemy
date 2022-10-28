import React from 'react';

import { render, screen } from "@testing-library/react";
import Checkout from './Checkout';

describe('Teste do componente de Checkout', () => {

  it('Deve renderizar o componente sem erro', () => {
    render(<Checkout />);
    const texto = screen.getByText(/checkout/i);
    expect(texto).toBeInTheDocument();
  });

})