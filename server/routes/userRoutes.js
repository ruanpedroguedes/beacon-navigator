const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/search', userController.getUserByName);
router.get('/', userController.getAllUsers);

module.exports = router;