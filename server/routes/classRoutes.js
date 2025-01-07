const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', classController.createClass);
router.get('/', classController.getClasses);
router.post('/add-member', classController.addMemberToClass);
router.get('/teacher-classes', authMiddleware(['teacher']), classController.getClassesByTeacher);
router.get('/student-classes', authMiddleware(['student']), classController.getClassByStudent)
router.get('/:id', classController.getClassById);


module.exports = router;