const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome da turma
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de alunos
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Professor da turma
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
