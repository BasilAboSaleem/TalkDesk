const e = require('express');
const {logAudit, AuditLog, User, Company, Department} = require('./utils');

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

exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id; 
  const companyId = req.user.company;

  try {
    const existing = await Department.findOne({ name, company: companyId });
if (existing) {
  req.flash('error', 'A department with this name already exists.');
  return res.redirect('/admin/departments/new');
}
    // Create new department
    const newDepartment = await Department.create({
      name,
      description,
      company: companyId
    });

    // Log audit entry
    await logAudit({
      userId,
      companyId,
      action: 'create_department',
      details: { departmentId: newDepartment.id, name }
    });

    console.log('Department created successfully:', newDepartment);

    // Flash success message
    req.flash('success', 'Department created successfully.');
    
    res.redirect('/admin/departments');
  } catch (error) {
    console.error('Error creating department:', error);

    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Failed to create department. Please try again later.'
    });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const companyId = req.user.company;
    const departments = await Department.find({ company: companyId });

    res.render('pages/admin/department/departments', { departments , 
      directMessages: [],
      onlineUsers: []
    }); 
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Failed to fetch departments. Please try again later.'
    });
  }
};

