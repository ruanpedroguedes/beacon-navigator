const mongoose = require('mongoose');

const avisosSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título do aviso
  content: { type: String, required: true }, // Conteúdo do aviso
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Turma associada ao aviso
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Professor que criou o aviso
  date: { type: Date, required: true }, // Data personalizada (exemplo: data de publicação ou validade)
}, { timestamps: true });

module.exports = mongoose.model('Avisos', avisosSchema);
