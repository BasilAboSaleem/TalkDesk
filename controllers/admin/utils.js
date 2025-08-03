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
const user = require('../../models/User');
const company = require('../../models/Company');



module.exports = {
     logAudit,
     user,
     company
    };
