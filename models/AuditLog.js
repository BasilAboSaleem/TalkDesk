const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  action: {
    type: String,
    required: true
  },

  targetType: {
    type: String,
    required: true
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  details: {
    type: Object,
    default: {}
  }

}, { timestamps: { createdAt: 'timestamp' } });

module.exports = mongoose.model('AuditLog', auditLogSchema);
