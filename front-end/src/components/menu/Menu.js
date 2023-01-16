import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCashRegister, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Menu(props) {

  function calcularTotal() {
    if (props.produtos.length === 0) {
      return '0,00';
    }

    let total = 0;
    props.produtos.forEach(produto => {
      let preco = produto.preco.replace(',', '.').replace('R$ ', '');
      total += parseFloat(preco) * produto.quantidade;
    });

    return total.toFixed(2).toString().replace('.', ',');
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Mini Ecommerce Udemy</Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <div style={{ display: 'inline-block' }}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
              }
              drop='start'
            >
              <NavDropdown.Item href="" onClick={props.handleExibirProdutos}>
                <FontAwesomeIcon icon={faShoppingBasket} />
                Produtos
              </NavDropdown.Item>

              <NavDropdown.Divider />
              { /*TO DO Itens do carrinho*/}
              <NavDropdown.Divider />

              <NavDropdown.Item href="" data-testid="total-carrinho">
                Total: R$ {calcularTotal()}
              </NavDropdown.Item>

              <span className={props.produtos.length === 0 ? 'hidden' : null}>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href=""
                  onClick={() => props.handleExibirCheckout(calcularTotal())}>

                  <FontAwesomeIcon icon={faCashRegister} />
                  Finalizar compra
                </NavDropdown.Item>
              </span>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </header>
  );
}

Menu.propTypes = {
  produtos: PropTypes.array.isRequired,
  handleExibirProdutos: PropTypes.func.isRequired,
  handleExibirCheckout: PropTypes.func.isRequired
}

export default Menu;