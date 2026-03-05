const mysql = require('mysql2');

// Ahora lee los datos desde tu archivo .env, ¡nada de contraseñas a la vista!
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = pool.promise();