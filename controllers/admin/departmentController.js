const {logAudit, AuditLog, User, Company} = require('./utils');

exports.getNewDepartment = async (req, res) => {
  try {
    // مؤقتا 
    let directMessages = [];
    let onlineUsers = [];
    res.render('pages/admin/department/add-department', {directMessages, onlineUsers});
  } catch (error) {
    console.error('Error fetching new department page:', error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while fetching the new department page.'
    });
  }
};