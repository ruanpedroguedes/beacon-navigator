// controllers/informeController.js
const Informe = require('../models/informeModel');
const User = require('../models/userModel'); // Importa o modelo User

exports.createInforme = async (req, res) => {
  const { nome, dia, descricao } = req.body;
  try {
    // Verifica se o aluno existe
    const aluno = await User.findOne({ nome });
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const newInforme = new Informe({ nome, dia, descricao });
    await newInforme.save();
    res.status(201).json(newInforme);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar informe', error: error.message });
  }
};

exports.getInformes = async (req, res) => {
  try {
    const informes = await Informe.find();
    res.status(200).json(informes);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar informes', error: error.message });
  }
};

// Nova função para buscar informes por nome do aluno
exports.getInformesByAluno = async (req, res) => {
  const { nome } = req.params;
  try {
    const informes = await Informe.find({ nome });
    res.status(200).json(informes);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar informes do aluno', error: error.message });
  }
};
