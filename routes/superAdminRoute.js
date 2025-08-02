const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdmin/superAdminController');
const { requireAuth, isSuperAdmin } = require('../middlewares/authMiddlewares');


router.get('/sadmin/companies/pending', requireAuth, isSuperAdmin, superAdminController.getPendingCompanies);
router.get('/sadmin/companies/:companyId', requireAuth, isSuperAdmin, superAdminController.viewPendingCompany);
router.post('/sadmin/companies/:companyId/approve', requireAuth, isSuperAdmin, superAdminController.approveCompany);


module.exports = router;