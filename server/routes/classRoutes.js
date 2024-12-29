const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/', classController.createClass);
router.get('/', classController.getClasses);

module.exports = router;