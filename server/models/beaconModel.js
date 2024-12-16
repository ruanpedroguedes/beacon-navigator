const mongoose = require('mongoose');

const beaconSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  instituicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution', // Referência à instituição onde o beacon está
    required: true,
  },
  localizacao: {
    type: String,
    required: true, // Descrição detalhada da localização dentro da instituição (ex: "andar 12, sala 04")
  },
});

const Beacon = mongoose.model('Beacon', beaconSchema);

module.exports = Beacon;
