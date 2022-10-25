import React, { useState } from 'react';
import Checkout from './components/checkout/Checkout';
import Menu from './components/menu/Menu';
import Produtos from './components/produtos/Produtos';
import './Mini-ecommerce.css';

function MiniEcommerce() {

  const [carrinho, setCarrinho] = useState({ produtos: [] });
  const [exibirProdutos, setExibirProdutos] = useState(true);
  const [exibirCheckout, setExibirChackout] = useState(false);
  const [total, setTotal] = useState('0,00');

  return (
    <main>
      <Menu />
      <Produtos />
      <Checkout />
    </main>
  );
}

export default MiniEcommerce;
