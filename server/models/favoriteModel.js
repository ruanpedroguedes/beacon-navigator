const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  beacon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beacon',
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
