import React from "react";

import { render, screen } from "@testing-library/react";
import Menu from "./Menu";

describe('Teste do componente menu', () => {

  it('Deve renderizar o componente sem errois', () => {
    render(
      <Menu
        produtos={[]}
        handleExibirCheckout={() => false}
        handleExibirProdutos={() => false}
      />
    );
    const text = screen.getByText(/Mini Ecommerce/i);
    expect(text).toBeInTheDocument();
  });

});