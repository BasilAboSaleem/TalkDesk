const express = require('express');
const router = express.Router();
const coreController = require('../controllers/coreController');
const {requireAuth, checkIfUser, isAdmin, isEmployee, isSuperAdmin} = require('../middlewares/authMiddlewares');

router.get('/', coreController.landing_get);
router.get('/dashboard', requireAuth, coreController.dashboard_get);



module.exports = router;