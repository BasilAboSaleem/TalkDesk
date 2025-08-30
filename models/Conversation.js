const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null
  },
  type: {
    type: String,
    enum: ['private', 'group', 'department_group', 'project_group'],
    default: 'private'
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
