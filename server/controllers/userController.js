const User = require('../models/userModel');

exports.getUserByName = async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.find({ nome: new RegExp(name, 'i') });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};

// Controlador para buscar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Busca todos os documentos na coleção
    res.status(200).json(users); // Retorna os usuários em formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};
