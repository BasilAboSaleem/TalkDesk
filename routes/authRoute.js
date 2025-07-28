const express = require('express');
const router = express.Router();
const companyAuthController = require('../controllers/auth/companyAuthController');


router.get('/register-company', companyAuthController.registerCompany_get);


module.exports = router;