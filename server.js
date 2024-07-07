const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/order');
require('dotenv').config(); // Carregar env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Resgata senha do dtonev para garantir segurança de dados
const MONGO_URI = process.env.MONGO_URI;

// Middleware para processar JSON requests
app.use(bodyParser.json());

// Define a rota para as operações relevantes ao CRUD
app.use('/order', orderRoutes);

// Se conecta ao MongoDB e lança o server
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
        console.log(`Server rodando em http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Erro conectando ao MongoDB', err);
});
