import React from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstado from './Listar-estado';
import ListarCidades from './Listar-cidades';

registerLocale('pt', pt);

function Checkout(props) {
  return (
    <div style={{ margin: '10px' }} className="bg-light p-5">
      <h3 className="text-center">Finalizar compra</h3>

      <Form noValidate style={{ margin: '10px' }} >
        <Form.Group as={Row} controlId="email">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control type='email' placeholder='Digite seu email' name='email' data-testid='text-email' />
            <Form.Control.Feedback type='invalid'>
              Digite um email válido
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='nomeCompleto'>
          <Form.Label column sm={3}>
            Nome Completo
          </Form.Label>
          <Col sm={9}>
            <Form.Control type='text' placeholder='Digite seu nome completo' name='nomeCompleto' data-testid='text-nome-completo' />
            <Form.Control.Feedback type='invalid'>
              Digite o seu nome complete (mínimo 5 caracteres).
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='dataNascimento'>
          <Form.Label column sm={3}>
            Data de nascimento
          </Form.Label>
          <Col sm={9}>
            <DatePicker locale='pt' peekNextMonth showMonthDropdown showYearDropdown dropdownMode='select' dateFormat='dd/MM/yyyy' placeholderText='Selecione a data' withPortal />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='cpf'>
          <Form.Label column sm={3}>
            CPF
          </Form.Label>
          <Col sm={9}>
            <Form.Control type='text' placeholder='Digite seu CPF' name='cpf' data-testid='text-cpf' />
            <Form.Control.Feedback type='invalid'>
              Digite um CPF válido.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='endereco'>
          <Form.Label column sm={3}>
            Endereço
          </Form.Label>
          <Col sm={9}>
            <Form.Control type='text' placeholder='Digite o seu endereço completo' name='endereco' data-testid='text-endereco' />
            <Form.Control.Feedback type='invalid'>
              Digite um endereço.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='estado'>
          <Form.Label column sm={3}>
            Estado
          </Form.Label>
          <Col sm={9}>
            <Form.Control as='select' name='estado' data-testid='text-estado'>
              <ListarEstado />
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Selecione um estado.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='cidade'>
          <Form.Label column sm={3}>
            Cidade
          </Form.Label>
          <Col sm={9}>
            <Form.Control as='select' name='cidade' data-testid='text-cidade'>
              <ListarCidades estado={'SP'} />
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Selecione uma cidade.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='cep'>
          <Form.Label column sm={3}>
            CEP
          </Form.Label>
          <Col sm={9}>
            <Form.Control type='text' placeholder='Digite seu CEP' name='cep' data-testid='text-cep' />
            <Form.Control.Feedback type='invalid'>
              Digite um CEP válido.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} contronId='emailPromocional'>
          <Form.Label column sm={12}>
            Deseja receber emails com promoções?
          </Form.Label>

          <Form.Check inline name='emailPromocional' type='radio' id='promocaoSim' value='S' label="Sim" style={{ marginLeft: '15px' }} />
          <Form.Check inline name='emailPromocional' type='radio' id='promocaoNão' value='N' label="Não" style={{ marginLeft: '15px' }} />
        </Form.Group>

        <Form.Group as={Row} contronId='termosCondicoes'>
          <Form.Check name='termosCondicoes' label="Concordo com os termos e condições" data-testid='text-termos-condicoes' style={{ marginLeft: '15px' }} />
        </Form.Group>

        <Form.Group as="Row" controlId='finalizarCompra'>
          <Col sm={12} className="text-center">
            <Button type='submit' variant='success' data-testid='btn-finalizar-compra'>Finalizar compra</Button>
          </Col>
        </Form.Group>

        <Modal show={false} data-testid='modal-compra-sucesso'>
          <Modal.Header closeButton>
            <Modal.Title>Compra realizada com sucesso!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Um Email de confirmação foi enviado com os detalhes da transação
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success">Continuar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={false} data-testid='modal-compra-sucesso'>
          <Modal.Header closeButton>
            <Modal.Title>Erro ao processar o pedido.</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Tente novamente em instantes.
          </Modal.Body>

          <Modal.Footer>
            <Button variant="warning">Continuar</Button>
          </Modal.Footer>
        </Modal>

      </Form>
    </div>
  );
}

export default Checkout;