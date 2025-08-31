const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  subdomain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  logo: {
    type: String,
    default: null
  },

  industry: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  defaultLanguage: {
    type: String,
    enum: ['en', 'ar'],
    default: 'en'
  },

  defaultTheme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },

  isActive: {
    type: Boolean,
    default: false,  
  },
isRejected: {
  type: Boolean,
  default: false
},
  rejectionReason: {
    type: String,
    default: ''
  },
  isDeleted: {
  type: Boolean,
  default: false
},
  deletedAt: {
    type: Date,
    default: null
  },
  settings: {
    type: Object,
    default: {}
  }

}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
