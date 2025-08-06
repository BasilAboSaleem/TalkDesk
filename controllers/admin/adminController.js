const {getNewDepartment, createDepartment, getDepartments, getEditDepartment,
  updateDepartment, softDeleteDepartment, getSoftDeletedDepartments
} = require('./departmentController');

module.exports = {
  getNewDepartment,
  createDepartment,
  getDepartments,
  getEditDepartment, 
  updateDepartment,
  softDeleteDepartment,
  getSoftDeletedDepartments
};
