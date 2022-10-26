import React, { useState } from 'react';

import PropTypes from 'prop-types';

import ListarProdutos from './listar-produtos';
import { Alert } from 'react-bootstrap';

function Produtos(props) {

  const [exibirMsg, setExibirMsg] = useState(false);
  const [produto, setProduto] = useState('');

  function exibirMensagem(produto) {
    setExibirMsg(true);
    setProduto(produto);

    setTimeout(() => {
      setExibirMsg(false);
    }, 3000);
  }

  function visivel() {
    return props.visivel ? null : 'hidden';
  }

  return (
    <div className={visivel()}>
      <Alert
        className="mx-2"
        variant="success"
        show={exibirMsg}>
        <b>{produto}</b> adicionado com sucesso ao carrinho
      </Alert>

      <ListarProdutos
        exibirMensagem={exibirMensagem}
      />
    </div>
  );
}

Produtos.propTypes = {
  visivel: PropTypes.bool.isRequired,
  adicionarProduto: PropTypes.func.isRequired
}

export default Produtos;