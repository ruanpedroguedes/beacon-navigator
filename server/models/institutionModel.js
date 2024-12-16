const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true, // Endereço da instituição
  },
  beacons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beacon', // Array de beacons associados à instituição
  }],
});

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
