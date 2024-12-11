// server/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Rota de cadastro
router.post('/register', registerUser);

// Rota de login
router.post('/login', loginUser);

module.exports = router;
