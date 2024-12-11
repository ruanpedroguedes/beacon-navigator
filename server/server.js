// Carregando as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Criando uma instância do express
const app = express();

// Usando middleware para parsear JSON
app.use(express.json());

// Verificando se as variáveis de ambiente estão sendo carregadas corretamente
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

// Conexão com o MongoDB usando a URL do .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexão com o MongoDB realizada com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  });

// Definindo a rota básica
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Defina a porta onde o servidor irá rodar
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});
