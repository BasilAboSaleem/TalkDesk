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



module.exports = {
     logAudit,
     AuditLog,
     User,
     Company
    };
