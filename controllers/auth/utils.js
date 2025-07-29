const Company = require('../../models/Company');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

 // Configuration cloudinary اعدادات الكلاودنري
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

// اعدادت ارسال إيميل التحقق 
 const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}); 
module.exports = {
    cloudinary,
    transporter,
    User,
    Company,
    bcrypt,
    jwt,
    fs,
    validationResult,
    nodemailer,
    
}