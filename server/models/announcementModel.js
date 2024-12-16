const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // O autor do aviso será um usuário do tipo 'professor'
    required: true,
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
