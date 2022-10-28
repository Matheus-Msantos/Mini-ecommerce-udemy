import React from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCashRegister, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Menu() {
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
              <NavDropdown.Item href="">
                <FontAwesomeIcon icon={faShoppingBasket} />
                Produtos
              </NavDropdown.Item>

              <NavDropdown.Divider />
              { /*TO DO Itens do carrinho*/}
              <NavDropdown.Divider />

              <NavDropdown.Item href="" data-testid="total-carrinho">
                Total: R$ {/* TO DO Função cálculo do total */}
              </NavDropdown.Item>

              <span>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">
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

export default Menu;