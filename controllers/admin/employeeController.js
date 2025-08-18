const e = require('connect-flash');
const {logAudit, AuditLog, User, Company, Department, Invitation, jwt, transporter} = require('./utils');


exports.getEmployees = async (req, res) => {
    try{
        const employees = await User.find({ role: 'employee' , isDeleted: false })
         .populate('department')
      .sort({ createdAt: -1 });
        res.render('pages/admin/employee/employees', { employees, showDeleted: false });
    }
    catch (error) {
    console.error('Error creating invitation:', error);
    res.status(500).render('pages/error/500', {
      message: 'An error occurred while creating the invitation.'
    });
  }
}