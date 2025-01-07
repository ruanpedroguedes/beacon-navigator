const express = require('express');
const router = express.Router();
const avisosController = require('../controllers/avisosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware(['teacher']), avisosController.createAviso);
router.get('/:classId', authMiddleware(['teacher', 'student']), avisosController.getAvisosByClass);

module.exports = router;