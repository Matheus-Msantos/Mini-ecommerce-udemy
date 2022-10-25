import React from 'react';
import placeholder from '../../assets/images/img-produto.png';
import { Card, Button } from 'react-bootstrap';

function ListarProdutos() {

    const produtos = [
        { nome: 'Aprenda Java', preco: 'R$ 59,90' },
        { nome: 'JavaScript em 24 horas', preco: 'R$ 19,99' },
        { nome: 'React em 7 dias', preco: 'R$ 29,99' },
        { nome: 'Algoritmos e Estrutura de Dados', preco: 'R$ 35,90' },
        { nome: 'Testes Unitários com Jasmine', preco: 'R$ 14,90' },
        { nome: 'TypeScript na prática', preco: 'R$ 9,90' }
    ];

    function exibirCard() {

        const cards = produtos.map((produto, index) =>
            <Card key={index}>
                <Card.Img variant="top" src={placeholder} />
                <Card.Body className="text-center">
                    <Card.Title>
                        {produto.nome}
                    </Card.Title>
                    <Card.Text>
                        Descrição do produto....
                    </Card.Text>
                    <Button variant="success" onClick={(event) => { handleComprar(event, produto) }}>
                        Comprar ({produto.preco})
                    </Button>
                </Card.Body>
            </Card>

        );

        return cards;
    }

    function handleComprar(event, produto) {
        event.preventDefault();
        // TO DO adicionar ao carrinho
        // TO DO exibir mensagem
    }

    return exibirCard();
}

export default ListarProdutos;