const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

// Cuando alguien haga un POST a /registro, llama a la función registrarUsuario
router.post('/registro', registrarUsuario);

// Cuando alguien haga un POST a /login, llama a la función loginUsuario
router.post('/login', loginUsuario);

module.exports = router;