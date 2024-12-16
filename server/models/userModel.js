const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['admin', 'usuario', 'professor'], // Adicionando 'professor' como tipo de usuário
    default: 'usuario',
  },
});

// Antes de salvar o usuário, vamos criptografar a senha
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();

  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para comparar senhas no login
userSchema.methods.comparePassword = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
