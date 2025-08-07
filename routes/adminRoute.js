const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddlewares');

router.get('/admin/departments/new', requireAuth, isAdmin, adminController.getNewDepartment);
router.post('/admin/departments/new', requireAuth, isAdmin, adminController.createDepartment); 
router.get('/admin/departments', requireAuth, isAdmin,  adminController.getDepartments); 
router.get('/admin/departments/:id/edit', requireAuth, isAdmin, adminController.getEditDepartment);
router.put('/admin/departments/:id', requireAuth, isAdmin, adminController.updateDepartment);
router.delete('/admin/departments/soft-delete/:id', requireAuth, isAdmin, adminController.softDeleteDepartment);
router.get('/admin/departments/soft-deleted', requireAuth, isAdmin, adminController.getSoftDeletedDepartments);
router.put('/admin/departments/restore/:id', requireAuth, isAdmin, adminController.restoreDepartment);

module.exports = router;