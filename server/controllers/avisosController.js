const Avisos = require('../models/avisosModel');
const Class = require('../models/classModel');

exports.createAviso = async (req, res) => {
  const { title, content, classId, date } = req.body;
  const createdBy = req.user.id; // Supondo que o ID do usuário está disponível no req.user

  try {
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    const newAviso = new Avisos({ title, content, class: classId, createdBy, date });
    await newAviso.save();
    res.status(201).json(newAviso);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar aviso', error: error.message });
  }
};

exports.getAvisosByClass = async (req, res) => {
  try {
    const avisos = await Avisos.find({ class: req.params.classId }).populate('createdBy', 'nome');
    res.status(200).json(avisos);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar avisos', error: error.message });
  }
};

