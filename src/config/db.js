const { Pool } = require('pg');
require('dotenv').config();

// Si existe DATABASE_URL (en la nube), la usamos con SSL. 
// Si no, usamos variables locales
const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: {
          rejectUnauthorized: false, // Necesario para conexiones seguras en la nube
        },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
);

pool.on('connect', () => {
  console.log('¡Base de datos PostgreSQL conectada con éxito!');
});

module.exports = pool;

module.exports = pool;