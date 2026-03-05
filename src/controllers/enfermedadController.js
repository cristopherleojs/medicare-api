const db = require('../config/db');

// 1. AGREGAR ENFERMEDAD (POST)
const agregarEnfermedad = async (req, res) => {
    try {
        const { id_usuario_fk, nombre_enfermedad } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO enfermedades (id_usuario_fk, nombre_enfermedad) VALUES (?, ?)',
            [id_usuario_fk, nombre_enfermedad]
        );
        res.status(201).json({ 
            mensaje: 'Enfermedad agregada correctamente', 
            idEnfermedad: resultado.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar la enfermedad' });
    }
};

// 2. OBTENER ENFERMEDADES (GET) - IMPORTANTE: Alias con "AS"
const obtenerEnfermedades = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        // Cambiamos los nombres para que Android los reconozca automáticamente
        // En tu enfermedadController.js
const [enfermedades] = await db.query(
    'SELECT idEnfermedad, id_usuario_fk AS idUsuario, nombre_enfermedad AS nombreEnfermedad FROM enfermedades WHERE id_usuario_fk = ?', 
    [idUsuario]
);
        res.status(200).json(enfermedades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el historial médico' });
    }
};

module.exports = { agregarEnfermedad, obtenerEnfermedades };