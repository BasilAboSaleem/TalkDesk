const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  logo: {
    type: String,
    default: null  //Cloudinary 
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

  settings: {
    type: Object,
    default: {}
  }

}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
