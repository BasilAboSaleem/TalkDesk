const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddlewares');




module.exports = router;