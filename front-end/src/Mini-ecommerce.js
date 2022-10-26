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

  function adicionarProduto(produto) {
    const objCarrinho = Object.assign({}, carrinho);
    let novoProduto = true;

    // Adiciona novo produto ao carrinho
    if (novoProduto) {
      objCarrinho.produtos.push({
        nome: produto.nome, preco: produto.preco, quantidade: 1
      });
    }

    // atualizar a quantidade de produto
    objCarrinho.produtos.forEach((prod, indice) => {
      if (prod.nome === produto.nome) {
        objCarrinho.produtos[indice].quantidade++;
        novoProduto = false;
      }
    });

    setCarrinho(objCarrinho);
  }

  return (
    <main>
      <Menu />
      <Produtos
        visivel={exibirProdutos}
        adicionarProduto={adicionarProduto}
      />
      <Checkout />
    </main>
  );
}

export default MiniEcommerce;
