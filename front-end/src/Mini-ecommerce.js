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

  function handleExibirProdutos() {
    setExibirChackout(false);
    setExibirProdutos(true);
  }

  function handleExibirCheckout(total) {
    setExibirChackout(true);
    setExibirProdutos(false);
    setTotal(total);
  }

  return (
    <main>
      <Menu
        produtos={carrinho.produtos}
        handleExibirProdutos={handleExibirProdutos}
        handleExibirCheckout={handleExibirCheckout}
      />
      <Produtos
        visivel={exibirProdutos}
        adicionarProduto={adicionarProduto}
      />
      <Checkout />
    </main>
  );
}

export default MiniEcommerce;
