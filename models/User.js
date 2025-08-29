const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants/roles');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  }, 

  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.EMPLOYEE
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  },

  language: {
    type: String,
    enum: ['en', 'ar'],
    default: null
  },

  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: null
  },

  status: {
    type: String,
    enum: ['online', 'offline', 'busy'],
    default: 'offline'
  },

  profileImage: {
    type: String,
    default: null
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

// Unique index for email and company
userSchema.index({ email: 1, company: 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
