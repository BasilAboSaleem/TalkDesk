const e = require('connect-flash');
const {logAudit, AuditLog, User, Company, Department, Invitation, jwt, transporter} = require('./utils');


exports.getEmployees = async (req, res) => {
    try{
        const employees = await User.find({company: req.user.company, role: 'employee'  })
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

exports.viewEmployeeDetails = async (req, res) => {
  try{
    const employee = await User.findById(req.params.id)
      .populate('department')
      .populate('company');
    if (!employee) {
      return res.status(404).render('pages/error/404', {
        message: 'Employee not found.'
      });
    }
    res.render('pages/admin/employee/view', { employee });
  }
  catch (error) {
    console.error('Error viewing employee details:', error);
    res.status(500).render('pages/error/500', {
      message: 'An error occurred while viewing employee details.'
    });
  }
}

exports.getEditEmployee = async (req, res) => {
  try {
    const departments = await Department.find({ company: req.user.company });
    const employee = await User.findOne({company: req.user.company, _id: req.params.id })
      .populate('department')
      .populate('company');

    if (!employee) {
      return res.status(404).render('pages/error/404', {
        message: 'Employee not found.'
      });
    }
    res.render('pages/admin/employee/edit', { departments, employee });
  }
  catch (error) {
    console.error('Error viewing employee details:', error);
    res.status(500).render('pages/error/500', {
      message: 'An error occurred while viewing employee details.'
    });
  }
}

exports.EditEmployee = async (req, res) => {
  try {
    const { department } = req.body;
    const employee = await User.findOne({ _id: req.params.id, company: req.user.company });
    if (!employee) {
      return res.status(404).render('pages/error/404', {
        message: 'Employee not found.'
      });
    }
    employee.department = department || employee.department;
    await employee.save();
    req.flash('success', res.locals.t('flashMessages.success.edit'));
    res.redirect('/admin/employees');
  }
  catch (error) {
    console.error('Error editing employee:', error);
    res.status(500).render('pages/error/500', {
      message: 'An error occurred while editing the employee.'
    });
  }
}

exports.softDeleteEmployee = async (req, res) => {
  try {
    const employee = await User.findOne({ _id: req.params.id, company: req.user.company });
    if (!employee) {
      return res.status(404).render('pages/error/404', {
        message: 'Employee not found.'
      });
    }
    employee.isDeleted = true;
    await employee.save();
    req.flash('success', res.locals.t('flashMessages.success.softDelete'));
    res.redirect('/admin/employees');
  }
  catch (error) {
    console.error('Error soft deleting employee:', error);
    res.status(500).render('pages/error/500', {
      message: 'An error occurred while soft deleting the employee.'
    });
  }
}
