const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const {
    finalizarCompra,
    obterCidadePorEstado
} = require('./Controllers/mini-ecommerce');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParse.json());

// URLs
app.post('/mini-ecommerce/checkout/finalizar-compra', finalizarCompra);
app.get('/mini-ecommerce/estado/:siglaEstado/cidades', obterCidadePorEstado);

app.listen(port, () => console.log(`Servidor online in port ${port}`));