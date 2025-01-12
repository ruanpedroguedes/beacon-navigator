// routes/informeRoutes.js
const express = require('express');
const { createInforme, getInformes, getInformesByAluno } = require('../controllers/informeController');
const router = express.Router();

router.post('/', createInforme);
router.get('/', getInformes);
router.get('/aluno/:nome', getInformesByAluno); // Nova rota para buscar informes por nome do aluno

module.exports = router;