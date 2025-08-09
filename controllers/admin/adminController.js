const {getNewDepartment, createDepartment, getDepartments, getEditDepartment,
  updateDepartment, softDeleteDepartment, getSoftDeletedDepartments, restoreDepartment,
  hardDeleteDepartment
} = require('./departmentController');
const {getNewInvitation, createInvitation} = require('./invitationController');

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
  getNewInvitation,
  createInvitation
};
