const e = require('express');
const {logAudit, AuditLog, User, Company, Department} = require('./utils');

exports.getNewDepartment = async (req, res) => {
  try {
    // مؤقتًا
    let directMessages = [];
    let onlineUsers = [];

    res.render('pages/admin/department/department-form', {
      department: null,
      formAction: '/admin/departments/new',
      pageTitle: res.locals.t('department.addTitle'),
      submitLabel: res.locals.t('department.addButton'),
      isEdit: false,
      directMessages,
      onlineUsers
    });

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
  const userName = req.user.name;
  const companyId = req.user.company;
  

  try {
    const existing = await Department.findOne({ name, company: companyId });
if (existing) {
  req.flash('error', res.locals.t('flashMessages.error.alreadyExists'));
  return res.redirect('/admin/departments/new');
}
    // Create new department
    const newDepartment = await Department.create({
      name,
      description,
      company: companyId,
      createdBy: userName,
    });

    // Log audit entry
    await logAudit({
      userId,
      companyId,
      action: 'create_department',
      details: { departmentId: newDepartment.id, name }
    });


    // Flash success message
    req.flash('success', res.locals.t('flashMessages.success.add'));

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
    const departments = await Department.find({ company: companyId , isDeleted: false });

    res.render('pages/admin/department/departments', { departments , 
      viewType: 'active', 
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

exports.getEditDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) {
      req.flash('error', res.locals.t('flashMessages.error.notFound'));
      return res.redirect('/admin/departments');
    }

    res.render('pages/admin/department/department-form', {
      department,
      formAction: `/admin/departments/${id}`,
      pageTitle: res.locals.t('department.editTitle'),
      submitLabel: res.locals.t('department.editButton'),
      isEdit: true,
      directMessages: [],
      onlineUsers: []
    });
  } catch (error) {
    console.error('Error fetching department for edit:', error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Failed to fetch department for editing. Please try again later.'
    });
  }
}

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;
  const companyId = req.user.company;

  try {
    const department = await Department.findById(id);
    if (!department) {
      req.flash('error', res.locals.t('flashMessages.error.notFound'));
      return res.redirect('/admin/departments');
    }

    // Check for duplicate name
    const existing = await Department.findOne({ name, company: companyId, _id: { $ne: id } });
    if (existing) {
      req.flash('error', res.locals.t('flashMessages.error.alreadyExists'));
      return res.redirect(`/admin/departments/${id}/edit`);
    }

    // Store old values for audit log
    const oldName = department.name;
    const oldDescription = department.description;

    // Update department
    department.name = name || department.name;
    department.description = description || department.description;
    await department.save();

    // Store new values for audit log
    const newName = department.name;
    const newDescription = department.description;

    // Log audit entry
    await logAudit({
      userId,
      companyId,
      action: 'update_department',
      details: {
        departmentId: id,
        before: { name: oldName, description: oldDescription },
        after: { name: newName, description: newDescription }
      }
    });

    req.flash('success', res.locals.t('flashMessages.success.update'));
    res.redirect('/admin/departments');
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Failed to update department. Please try again later.'
    });
  }
};

exports.softDeleteDepartment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userName = req.user.name;
  const companyId = req.user.company;

  try {
    const department = await Department.findById(id);
    if (!department) {
      req.flash('error', res.locals.t('flashMessages.error.notFound'));
      return res.redirect('/admin/departments');
    }

    // Soft delete department
    department.isDeleted = true;
    department.markModified('isDeleted');

    await department.save();
 
    // Log audit entry
    await logAudit({
      userId,
      companyId,
      action: 'soft_delete_department',
      details: { departmentId: id, name: department.name, deletedBy: userName }
    });

    req.flash('success', res.locals.t('flashMessages.success.softDelete'));
    res.redirect('/admin/departments');
  } catch (error) {
    console.error('Error soft deleting department:', error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Failed to soft delete department. Please try again later.'
    });
  }
};

exports.getSoftDeletedDepartments = async (req, res) => {
  try {
    const companyId = req.user.company;
    const departments = await Department.find({ company: companyId, isDeleted: true });

    res.render('pages/admin/department/departments', { 
      departments, 
      viewType: 'deleted', 
      directMessages: [],
      onlineUsers: [] 
    });
  } catch (error) {
    console.error('Error fetching soft deleted departments:', error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Failed to fetch soft deleted departments. Please try again later.'
    });
  }
}