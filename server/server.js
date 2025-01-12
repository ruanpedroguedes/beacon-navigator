// Carregando as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa o pacote cors

// Criando uma instância do express
const app = express();

// Configurando o middleware CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5176'], // Lista de origens permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Se precisar de cookies
}));


// Usando middleware para parsear JSON
app.use(express.json());

// Verificando se as variáveis de ambiente estão configuradas
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error('Erro: Variáveis de ambiente não configuradas corretamente!');
  process.exit(1);
}

// Conexão com o MongoDB usando a URL do .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexão com o MongoDB realizada com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

// Definindo a rota básica
app.get('/', (req, res) => {
  res.send('Servidor rodando e MongoDB conectado!');
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!', error: err.message });
});

// Defina a porta onde o servidor irá rodar
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



// Rotas de autenticação
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

