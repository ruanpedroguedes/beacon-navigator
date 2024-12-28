// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.send('Bem-vindo, Admin!');
});

router.get('/teacher', authMiddleware(['teacher']), (req, res) => {
  res.send('Bem-vindo, Professor!');
});

router.get('/student', authMiddleware(['student']), (req, res) => {
  res.send('Bem-vindo, Aluno!');
});

module.exports = router;