const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de que esta ruta apunte a tu conexión de MySQL

// 1. OBTENER ENFERMEDADES (GET)
// Esta ruta la usa el LaunchedEffect en Android para llenar la lista
router.get('/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const query = 'SELECT * FROM enfermedades WHERE id_usuario_fk = ?';

    db.query(query, [idUsuario], (err, results) => {
        if (err) {
            console.error('Error al obtener enfermedades:', err);
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
        res.json(results);
    });
});

// 2. AGREGAR ENFERMEDAD (POST)
// Esta ruta la usa el botón "Guardar" de tu celular
router.post('/agregar', (req, res) => {
    const { id_usuario_fk, nombre_enfermedad } = req.body;
    const query = 'INSERT INTO enfermedades (id_usuario_fk, nombre_enfermedad) VALUES (?, ?)';

    db.query(query, [id_usuario_fk, nombre_enfermedad], (err, result) => {
        if (err) {
            console.error('Error al insertar enfermedad:', err);
            return res.status(500).json({ error: 'Error al insertar en la base de datos' });
        }
        res.json({ 
            mensaje: 'Enfermedad registrada con éxito', 
            idEnfermedad: result.insertId 
        });
    });
});

// 3. ELIMINAR ENFERMEDAD (DELETE) - ¡NUEVA!
// Esta es la que acabamos de conectar al icono de la basura
router.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM enfermedades WHERE idEnfermedad = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar enfermedad:', err);
            return res.status(500).json({ error: 'Error al eliminar de la base de datos' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'No se encontró la enfermedad con ese ID' });
        }

        res.json({ mensaje: 'Enfermedad eliminada correctamente' });
    });
});

module.exports = router;