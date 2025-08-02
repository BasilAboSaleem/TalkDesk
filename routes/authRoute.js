const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {requireAuth, checkIfUser, redirectIfAuthenticated,isAdmin, isEmployee, isSuperAdmin, loginLimiter} = require('../middlewares/authMiddlewares');



router.get('/register-company', authController.registerCompany_get);
router.post('/register-company', upload.single('logo'), authController.registerCompany_post);
router.get('/login', redirectIfAuthenticated, authController.login_get);
router.post('/login', loginLimiter, authController.login_post);
router.get('/logout', requireAuth, authController.logout_get);
module.exports = router;