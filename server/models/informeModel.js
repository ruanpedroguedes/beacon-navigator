// models/informeModel.js
const mongoose = require('mongoose');

const informeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dia: { type: String, required: true },
  descricao: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Informe', informeSchema);