const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee/employeeController');
const { requireAuth ,isEmployee } = require('../middlewares/authMiddlewares');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { check, validationResult } = require("express-validator");

router.get('/invitation/accept', employeeController.showAcceptForm); 
router.post('/invitation/accept',
  upload.single('profileImage'),
  [
    check("password", "Password must be at least 8 characters with 1 upper case letter, 1 lower case letter, 1 number, and 1 special character")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
  ],
  employeeController.acceptInvitation
);

module.exports = router;