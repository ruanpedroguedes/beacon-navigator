const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome da turma
  description: { type: String }, // Descrição da turma
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de alunos
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Professor da turma (não obrigatório)
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);