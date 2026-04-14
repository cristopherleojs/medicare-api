const admin = require('firebase-admin');

// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCCIONES PARA CONFIGURAR:
//
// 1. Ve a Firebase Console → Tu proyecto → Configuración del proyecto
// 2. Pestaña "Cuentas de servicio"
// 3. Haz clic en "Generar nueva clave privada"
// 4. Descarga el archivo JSON y guárdalo como:
//    medialert-api/src/config/serviceAccountKey.json
//
// ¡IMPORTANTE! Nunca subas serviceAccountKey.json a GitHub.
//              Ya está en el .gitignore.
// ─────────────────────────────────────────────────────────────────────────────

let firebaseApp = null;

function inicializarFirebase() {
    if (firebaseApp) return firebaseApp;

    try {
        const serviceAccount = require('./serviceAccountKey.json');
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('✅ Firebase Admin inicializado');
    } catch (error) {
        console.error('❌ Error al inicializar Firebase Admin:', error.message);
        console.error('   Asegúrate de que serviceAccountKey.json esté en src/config/');
    }

    return firebaseApp;
}

inicializarFirebase();

module.exports = admin;
