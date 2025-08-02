const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdmin/superAdminController');
const { requireAuth, isSuperAdmin } = require('../middlewares/authMiddlewares');

router.get('/sadmin/companies', requireAuth, isSuperAdmin, superAdminController.getAllCompanies);
router.get('/sadmin/companies/view/:companyId', requireAuth, isSuperAdmin, superAdminController.viewCompany);
router.post('/sadmin/companies/:companyId/soft-delete', requireAuth, isSuperAdmin, superAdminController.softDeleteCompany);
router.get('/sadmin/companies/pending', requireAuth, isSuperAdmin, superAdminController.getPendingCompanies);
router.get('/sadmin/companies/:companyId', requireAuth, isSuperAdmin, superAdminController.viewPendingCompany);
router.post('/sadmin/companies/:companyId/approve', requireAuth, isSuperAdmin, superAdminController.approveCompany);
router.post('/sadmin/companies/:companyId/reject', requireAuth, isSuperAdmin, superAdminController.rejectCompany);


module.exports = router;