// Carregando as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa o pacote cors

// Criando uma instância do express
const app = express();

// Configurando o middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições do frontend (Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Se precisar de cookies, habilite isso
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

// Usuários predefinidos
const User = require('./models/userModel'); // Certifique-se de que o modelo User está configurado corretamente

const seedUsers = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Administrador',
        email: 'admin@example.com',
        password: 'admin123', // Hash a senha em produção
        role: 'admin',
        isPCD: false,
      });
      console.log('Usuário Administrador criado.');
    }

    const existingTeacher = await User.findOne({ email: 'professor@example.com' });
    if (!existingTeacher) {
      await User.create({
        name: 'Professor',
        email: 'professor@example.com',
        password: 'prof123', // Hash a senha em produção
        role: 'teacher',
        isPCD: false,
      });
      console.log('Usuário Professor criado.');
    }
  } catch (error) {
    console.error('Erro ao criar usuários predefinidos:', error);
  }
};

seedUsers();
