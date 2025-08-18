const {getNewDepartment, createDepartment, getDepartments, getEditDepartment,
  updateDepartment, softDeleteDepartment, getSoftDeletedDepartments, restoreDepartment,
  hardDeleteDepartment
} = require('./departmentController');
const {getNewInvitation, createInvitation ,getInvitations,
  viewInvitationDetails , resendInvitation
} = require('./invitationController');

const {getEmployees, viewEmployeeDetails, getEditEmployee, EditEmployee} = require('./employeeController');


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
  createInvitation,
  getInvitations,
  viewInvitationDetails,
  resendInvitation,
  getEmployees,
  viewEmployeeDetails,
  getEditEmployee,
  EditEmployee
};
