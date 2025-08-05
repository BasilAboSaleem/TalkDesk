const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddlewares');

router.get('/admin/departments/new', requireAuth, isAdmin, adminController.getNewDepartment);
router.post('/admin/departments/new', requireAuth, isAdmin, adminController.createDepartment); 
router.get('/admin/departments', requireAuth, isAdmin,  adminController.getDepartments); 

module.exports = router;