const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: true
  },

  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  fileName: {
    type: String,
    required: true
  },

  fileType: {
    type: String,
    required: true
  },

  fileSize: {
    type: Number,
    required: true
  },

  url: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Attachment', attachmentSchema);
