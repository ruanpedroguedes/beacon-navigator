// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// Registrar novo usuário
const registerUser = async (req, res) => {
  try {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (senha !== confirmarSenha) {
      return res.status(400).json({ message: 'Senhas não coincidem' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const user = new User({ nome, email, senha });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user._id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      tipo: user.tipo,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err });
  }
};

module.exports = { registerUser, loginUser };
