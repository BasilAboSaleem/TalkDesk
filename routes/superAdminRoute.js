const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdmin/superAdminController');
const { requireAuth, isSuperAdmin } = require('../middlewares/authMiddlewares');


router.get('/admin/companies/pending', requireAuth, isSuperAdmin, superAdminController.pendingCompanies_get);


module.exports = router;