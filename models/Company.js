const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, // اسم الشركة لازم يكون فريد
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
    unique: true,  // اسم النطاق الفرعي لازم يكون فريد
    lowercase: true,
    trim: true,
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

  isActive: {
    type: Boolean,
    default: false,  // يتم تفعيله بعد التأكد من البيانات أو عبر الأدمن
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
  settings: {
    type: Object,
    default: {}
  }

}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
