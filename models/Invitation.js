const mongoose = require('mongoose');

const employeeInvitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['employee', 'admin'], 
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'expired', 'canceled'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmployeeInvitation', employeeInvitationSchema);
