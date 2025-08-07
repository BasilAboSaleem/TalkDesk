const {getNewDepartment, createDepartment, getDepartments, getEditDepartment,
  updateDepartment, softDeleteDepartment, getSoftDeletedDepartments, restoreDepartment,
  hardDeleteDepartment
} = require('./departmentController');
const {getNewInvitation} = require('./invitationController');

module.exports = {
  getNewDepartment,
  createDepartment,
  getDepartments,
  getEditDepartment, 
  updateDepartment,
  softDeleteDepartment,
  getSoftDeletedDepartments,
  restoreDepartment,
  hardDeleteDepartment,
  getNewInvitation
};
