import React from 'react';
import Checkout from './components/checkout/Checkout';
import Menu from './components/menu/Menu';
import Produtos from './components/produtos/Produtos';
import './Mini-ecommerce.css';

function MiniEcommerce() {



  return (
    <main>
      <Menu />
      <Produtos />
      <Checkout />
    </main>
  );
}

export default MiniEcommerce;
