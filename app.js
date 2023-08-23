const express = require('express');
const { randomUUID } = require('crypto');

const app = express();

app.use(express.json());

const produtos = [];

app.post('/produtos', (request, response) =>{
    const {name, price, description} = request.body

    const produto = {
        id: randomUUID(),
        name,
        price,
        description
    };

    produtos.push(produto);

    return response.json(produto);
});

app.get('/produtos', (request, response) => {
    return response.json(produtos);
});

app.get('/produtos/:id', (request, response) => {
    const { id } = request.params;

    const produto = produtos.find((produto) => produto.id === id);

    return response.json(produto);
});

app.delete('/produtos/:id', (request, response) => {
    const { id } = request.params;
    
    const produto = produtos.findIndex((produto) => produto.id === id);

    produtos.splice(produto, 1);

    return response.json({"message": "Produto deletado com Sucesso!"});
});


app.listen(3001, () => {
    console.log("Servidor aberto na porta 3001!");
});