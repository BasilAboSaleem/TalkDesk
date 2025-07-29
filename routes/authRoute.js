const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get('/register-company', authController.registerCompany_get);
router.post('/register-company', upload.single('logo'), authController.registerCompany_post);


module.exports = router;