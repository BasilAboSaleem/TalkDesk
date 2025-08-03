const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: ''
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  
  isDeleted: {
  type: Boolean,
  default: false
}

  

}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
