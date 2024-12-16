const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  acao: {
    type: String,
    required: true, // Ex: 'criou beacon', 'editou beacon', 'salvou favorito', etc.
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
