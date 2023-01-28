import React from 'react';
import { render } from '@testing-library/react';
import ListarEstado from './Listar-estado';

describe('Teste do componente de listagem de estado', () => {

  it('Deve gerar uma listagem de estado', () => {
    const { getByTestId } = render(<ListarEstado />);
    expect(getByTestId('AM')).toHaveTextContent('Amazonas');
  })

});