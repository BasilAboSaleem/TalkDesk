const express = require('express');
const router = express.Router();
const companyAuthController = require('../controllers/auth/companyAuthController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get('/register-company', companyAuthController.registerCompany_get);
router.post('/register-company', upload.single('logo'), companyAuthController.registerCompany_post);


module.exports = router;