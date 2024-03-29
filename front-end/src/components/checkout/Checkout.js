import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import DatePicker, { registerLocale } from 'react-datepicker';
import { Formik } from 'formik';
import { validarCpf, formatarCpf } from '../../utils/cpf-util';
import { formatarCep } from '../../utils/cep-util';

import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstado from './Listar-estado';
import ListarCidades from './Listar-cidades';

import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

registerLocale('pt', pt);

function Checkout(props) {

  const CHECKOUT_URL = 'http://localhost:3001/mini-ecommerce/checkout/finalizar-compra';

  const [dataNascimento, setDataNascimento] = useState(null);
  const [formEnviado, setFormEnviado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErroModal, setShowErroModal] = useState(false);

  const schema = yup.object({
    email: yup.string().email().required(),
    nomeCompleto: yup.string().required().min(5),
    cpf: yup.string().required().min(14).max(14).test('cpf-valido', 'cpf inválido', (cpf) => validarCpf(cpf)),
    endereco: yup.string().required(),
    cidade: yup.string().required(),
    cep: yup.string().required().min(9).max(9),
    emailPromocional: yup.string().required(),
    termosCondicoes: yup.bool().oneOf([true]),
  });

  function visivel() {
    return props.visivel ? 'bg-light p-5' : 'hidden';
  }

  async function finalizarCompra(dados) {
    if (!dataNascimento) {
      setFormEnviado(true);
      return;
    }

    dados.dataNascimento = dataNascimento;
    dados.produtos = JSON.stringify(props.produtos);
    dados.total = `R$ ${props.total}`;

    try {
      await axios.post(CHECKOUT_URL, dados);
      setShowModal(true);
      props.handleLimparCarrinho();

    } catch (error) {
      setShowErroModal(true);
    }
  }

  function handleDataNascimento(data) {
    setDataNascimento(data)
  }

  function datePickerCss() {
    if (!formEnviado)
      return "form-control"


    if (dataNascimento)
      return "form-control is-valid"
    else
      return "form-control is-invalid"

  }

  function handleContinuar() {
    setShowModal(false);
    props.handleExibirProdutos();
  }

  function handlefecharErroModal() {
    setShowErroModal(false);
  }

  return (
    <div style={{ margin: '10px' }} className={visivel()}>
      <h3 className="text-center">Finalizar compra</h3>

      <Formik
        onSubmit={(values) => finalizarCompra(values)}
        initialValues={{
          email: '',
          nomeCompleto: '',
          cpf: '',
          endereco: '',
          estado: '',
          cep: '',
          termosCondicoes: false,
          emailPromocional: 'S',
        }}
        validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate style={{ margin: '10px' }} onSubmit={handleSubmit} >

            <Form.Group as={Row} controlId="email">
              <Form.Label column sm={3}>
                Email
              </Form.Label>

              <Col sm={9}>
                <Form.Control
                  type='email'
                  placeholder='Digite seu email'
                  name='email'
                  data-testid='text-email'
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />

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
                <Form.Control
                  type='text'
                  placeholder='Digite seu nome completo'
                  name='nomeCompleto'
                  data-testid='text-nome-completo'
                  values={values.nomeCompleto}
                  onChange={handleChange}
                  isValid={touched.nomeCompleto && !errors.nomeCompleto}
                  isInvalid={touched.nomeCompleto && !!errors.nomeCompleto}
                />

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
                <DatePicker
                  locale='pt'
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Selecione a data'
                  withPortal
                  selected={dataNascimento}
                  onChange={handleDataNascimento}
                  className={datePickerCss()}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='cpf'>

              <Form.Label column sm={3}>
                CPF
              </Form.Label>

              <Col sm={9}>
                <Form.Control
                  type='text'
                  placeholder='Digite seu CPF'
                  name='cpf'
                  data-testid='text-cpf'
                  value={values.cpf}
                  onChange={e => {
                    e.currentTarget.value = formatarCpf(e.currentTarget.value);
                    handleChange(e);
                  }}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && !!errors.cpf}
                />

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
                <Form.Control
                  type='text'
                  placeholder='Digite o seu endereço completo'
                  name='endereco'
                  data-testid='text-endereco'
                  value={values.endereco}
                  onChange={handleChange}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && !!errors.endereco}
                />

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
                <Form.Control
                  as='select'
                  name='estado'
                  data-testid='text-estado'
                  value={values.estado}
                  onChange={handleChange}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && !!errors.estado}
                >
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
                <Form.Control
                  as='select'
                  name='cidade'
                  data-testid='text-cidade'
                  value={values.cidade}
                  onChange={handleChange}
                  isValid={touched.cidade && !errors.cidade}
                  isInvalid={touched.cidade && !!errors.cidade}
                >
                  <ListarCidades estado={values.estado} />
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
                <Form.Control
                  type='text'
                  placeholder='Digite seu CEP'
                  name='cep'
                  data-testid='text-cep'
                  value={values.cep}
                  onChange={e => {
                    e.currentTarget.value = formatarCep(e.currentTarget.value);
                    handleChange(e);
                  }}
                  isValid={touched.cep && !errors.cep}
                  isInvalid={touched.cep && !!errors.cep}
                />

                <Form.Control.Feedback type='invalid'>
                  Digite um CEP válido.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} contronId='emailPromocional'>
              <Form.Label column sm={12}>
                Deseja receber emails com promoções?
              </Form.Label>

              <Form.Check
                inline
                name='emailPromocional'
                type='radio'
                id='promocaoSim'
                value='S'
                label="Sim"
                style={{ marginLeft: '15px' }}
                checked={values.emailPromocional === 'S'}
                onChange={handleChange}
              />

              <Form.Check
                inline
                name='emailPromocional'
                type='radio'
                id='promocaoNão'
                value='N'
                label="Não"
                style={{ marginLeft: '15px' }}
                checked={values.emailPromocional === 'N'}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Row} contronId='termosCondicoes'>
              <Form.Check
                name='termosCondicoes'
                label="Concordo com os termos e condições"
                data-testid='text-termos-condicoes'
                style={{ marginLeft: '15px' }}
                values={values.termosCondicoes}
                onChange={handleChange}
                isValid={touched.termosCondicoes && !errors.termosCondicoes}
                isInvalid={touched.termosCondicoes && !!errors.termosCondicoes}
              />
            </Form.Group>

            <Form.Group as="Row" controlId='finalizarCompra'>
              <Col sm={12} className="text-center">
                <Button type='submit' variant='success' data-testid='btn-finalizar-compra'>Finalizar compra</Button>
              </Col>
            </Form.Group>

            <Modal show={showModal} data-testid='modal-compra-sucesso' onHide={handleContinuar}>
              <Modal.Header closeButton>
                <Modal.Title>Compra realizada com sucesso!</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                Um Email de confirmação foi enviado com os detalhes da transação
              </Modal.Body>

              <Modal.Footer>
                <Button variant="success" onClick={handleContinuar}>Continuar</Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showErroModal} data-testid='modal-compra-sucesso' onHide={handlefecharErroModal}>
              <Modal.Header closeButton>
                <Modal.Title>Erro ao processar o pedido.</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                Tente novamente em instantes.
              </Modal.Body>

              <Modal.Footer>
                <Button variant="warning" onClick={handlefecharErroModal}>Continuar</Button>
              </Modal.Footer>
            </Modal>

          </Form>
        )}
      </Formik>
    </div>
  );
}

Checkout.propTypes = {
  visivel: PropTypes.bool.isRequired,
  produtos: PropTypes.object.isRequired,
  total: PropTypes.string.isRequired,
  handleExibirProdutos: PropTypes.func.isRequired,
  handleLimparCarrinho: PropTypes.func.isRequired,
}

export default Checkout;