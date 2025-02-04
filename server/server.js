// Carregando as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Configurando o middleware CORS para ambiente de desenvolvimento
app.use(cors({
  origin: 'http://localhost:5173', // Permite a origem do frontend em modo dev (Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware para parsear JSON
app.use(express.json());

// Verificando se as variáveis de ambiente estão configuradas
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error('Erro: Variáveis de ambiente não configuradas corretamente!');
  process.exit(1);
}

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexão com o MongoDB realizada com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

// ************* SERVINDO O FRONTEND *************

// Servir os arquivos estáticos da pasta dist (build do Vite)
app.use(express.static(path.join(__dirname, '../dist')));

// Redirecionar todas as rotas que não são API para o index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// ************* ROTAS DA API *************

// Importando e usando as rotas da API
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const classRoutes = require('./routes/classRoutes');
app.use('/api/classes', classRoutes);

const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes);

const avisosRoutes = require('./routes/avisosRoutes');
app.use('/api/avisos', avisosRoutes);

const informeRoutes = require('./routes/informeRoutes');
app.use('/api/informes', informeRoutes);

// Rota básica para verificar se o servidor está rodando
app.get('/api', (req, res) => {
  res.send('Servidor rodando e MongoDB conectado!');
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!', error: err.message });
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

