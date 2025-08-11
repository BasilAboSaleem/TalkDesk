const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee/employeeController');
const { requireAuth ,isEmployee } = require('../middlewares/authMiddlewares');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/invitation/accept', employeeController.showAcceptForm); 

module.exports = router;