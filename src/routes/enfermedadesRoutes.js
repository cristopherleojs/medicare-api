const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// AGREGAR ENFERMEDAD
router.post('/agregar', (req, res) => {
    // Los nombres aquí coinciden con EnfermedadRequest de Android
    const { idUsuario, nombreEnfermedad, descripcion } = req.body;
    
    const query = 'INSERT INTO enfermedades (id_usuario_fk, nombre_enfermedad, descripcion) VALUES (?, ?, ?)';

    db.query(query, [idUsuario, nombreEnfermedad, descripcion], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json({ mensaje: 'Registrado con éxito', id: result.insertId });
    });
});

// OBTENER ENFERMEDADES
router.get('/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const query = 'SELECT idEnfermedad as id, nombre_enfermedad as nombre, descripcion FROM enfermedades WHERE id_usuario_fk = ?';

    db.query(query, [idUsuario], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;