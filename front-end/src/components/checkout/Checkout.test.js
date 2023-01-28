import React from 'react';

import { render } from "@testing-library/react";
import Checkout from './Checkout';

describe('Teste do componente de Checkout', () => {

  it('Deve renderizar o componente sem erro', () => {
    const { getAllByText } = render(<Checkout />);
    const texto = getAllByText('Finalizar compra');
    expect(texto[0]).toBeInTheDocument();
  });

})