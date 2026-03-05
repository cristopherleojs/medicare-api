require('dotenv').config(); // Esto lee tu archivo .env
const express = require('express');
const cors = require('cors');

// Importar nuestras nuevas rutas
const authRoutes = require('./src/routes/authRoutes');
const enfermedadesRoutes = require('./src/routes/enfermedadesRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Aquí conectamos la ruta base con el archivo de rutas
app.use('/api/auth', authRoutes);
app.use('/api/enfermedades', enfermedadesRoutes);

// Una ruta simple para saber que el servidor está vivo
app.get('/', (req, res) => {
    res.send('API de MediCare funcionando al 100% 🚀');
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor profesional corriendo en http://localhost:${PORT}`);
});