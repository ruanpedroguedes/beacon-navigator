const Class = require('../models/classModel');

exports.createClass = async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }
  console.log(name, description)
  try {
    const newClass = new Class({ name, description });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar turma', error: error.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('students');
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar turmas', error: error.message });
  }
};