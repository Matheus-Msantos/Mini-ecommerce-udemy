import React from "react";

import { render, screen } from "@testing-library/react";
import ListarProdutos from './listar-produtos';

describe('Teste do componente Lista de produto', () => {

  it('Deve renderizar os nomes dos produtos nos cards', () => {
    render(<ListarProdutos adicionarProduto={() => false} exibirMensagem={() => false} />);
    expect(screen.getByTestId('card1')).toHaveTextContent('Aprenda Java');
  });

});