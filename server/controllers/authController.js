const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { nome, email, senha, role = 'student', isPCD, pcdDetails } = req.body;

    // Verifica se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já registrado!' });
    }

    // Hash da senha
    console.log(senha)
    const hashedsenha = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const newUser = await User.create({
      nome,
      email,
      senha: hashedsenha,
      role,
      isPCD,
      pcdDetails,
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou senha inválidos!' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha inválidos!' });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token, o tipo de usuário e o nome do usuário
    res.status(200).json({ token, role: user.role, nome: user.nome });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};
module.exports = { register, login };
