import React from "react";

import { render, screen } from "@testing-library/react";
import Menu from "./Menu";

describe('Teste do componente menu', () => {

  it('Deve renderizar o componente sem errois', () => {
    render(<Menu />);
    const text = screen.getByText(/menu/i);
    expect(text).toBeInTheDocument();
  });

});