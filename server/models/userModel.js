const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true }, // Define o tipo de usuário
  isPCD: { type: Boolean, required: true }, // Se é PCD
  pcdDetails: { type: String }, // Informações adicionais sobre PCD (opcional)
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
