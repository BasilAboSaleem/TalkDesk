const AuditLog = require('../../models/AuditLog');
async function logAudit({ userId, companyId, action, details = {} }) {
  try {
    await AuditLog.create({
      user: userId,
      company: companyId,
      action,
      details
    });
  } catch (error) {
    console.error('Failed to log audit entry:', error);
  }
}
const User = require('../../models/User');
const Company = require('../../models/Company');
const Department = require('../../models/Department');
const Invitation = require('../../models/Invitation');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// اعدادت ارسال إيميل 
 const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});




module.exports = {
     logAudit,
     AuditLog,
     User,
     Company,
      Department,
      Invitation,
      jwt,
      transporter
    };
