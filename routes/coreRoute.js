const express = require('express');
const router = express.Router();
const coreController = require('../controllers/coreController');

router.get('/', coreController.landing_get);
router.get('/dashboard', coreController.dashboard_get);


module.exports = router;