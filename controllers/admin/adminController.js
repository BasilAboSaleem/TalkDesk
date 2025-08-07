const {getNewDepartment, createDepartment, getDepartments, getEditDepartment,
  updateDepartment, softDeleteDepartment, getSoftDeletedDepartments, restoreDepartment
} = require('./departmentController');

module.exports = {
  getNewDepartment,
  createDepartment,
  getDepartments,
  getEditDepartment, 
  updateDepartment,
  softDeleteDepartment,
  getSoftDeletedDepartments,
  restoreDepartment
};
