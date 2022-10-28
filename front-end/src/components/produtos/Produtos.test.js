import React from "react";

import { render, screen } from "@testing-library/react";
import Produtos from "./Produtos";

describe('Teste do componente produtos', () => {

  it('Deve renderinzar o componente quando visível', () => {
    render(<Produtos visivel={true} adicionarProduto={() => false} />);
    const botoes = screen.getAllByText(/comprar/i);
    expect(botoes).toBeTruthy();
  });

})