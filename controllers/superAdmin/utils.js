const Company = require('../../models/Company');
const User = require('../../models/User');
const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');
const Department = require('../../models/Department');
const AuditLog = require('../../models/AuditLog');
const Attachment = require('../../models/Attachment');
const mongoose = require('mongoose');


const cloudinary = require('cloudinary').v2;

 // Configuration cloudinary اعدادات الكلاودنري
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


module.exports = {
    Company,
    User,
    Message,
    Conversation,
    Department,
    AuditLog,
    Attachment,
    mongoose,
    cloudinary

}
