const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },

  content: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
