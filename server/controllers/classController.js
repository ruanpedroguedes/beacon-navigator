const Class = require('../models/classModel');
const User = require('../models/userModel');
const mongoose = require('mongoose')


exports.createClass = async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }
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
    const classes = await Class.find().populate('students').populate('teacher');
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar turmas', error: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate('students').populate('teacher');
    if (!classItem) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.status(200).json(classItem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar turma', error: error.message });
  }
};

exports.addMemberToClass = async (req, res) => {
  const { classId, userId, role } = req.body;
  try {
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    if (role === 'student') {
      classItem.students.push(userId);
    } else if (role === 'teacher') {
      classItem.teacher = userId;
    } else {
      return res.status(400).json({ message: 'Role inválido' });
    }
    await classItem.save();
    res.status(200).json(classItem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar membro à turma', error: error.message });
  }
};

exports.getClassesByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id; // Certifique-se de que o ID do professor está disponível no `req.user`.
    const classes = await Class.find({ teacher: teacherId });
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar turmas do professor', error: error.message });
  }
};

exports.getClassByStudent = async (req, res) => {
  try{
    const studentId = req.user.id
    const classes = await Class.find({students: studentId})
    res.status(200).json(classes)
  } catch (error){
    res.status(400).json({message: 'Erro ao buscar turmas do aluno', error: error.message})
  }
}