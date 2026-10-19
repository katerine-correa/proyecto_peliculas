const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para que el servidor entienda JSON y acepte peticiones
app.use(cors());
app.use(express.json());

// RUTAS DE LOS MODULOS
app.use('/api', require('./routes/generoRoutes'));
app.use('/api', require('./routes/directorRoutes'));
app.use('/api', require('./routes/productoraRoutes'));
app.use('/api', require('./routes/tipoRoutes'));
app.use('/api', require('./routes/mediaRoutes'));

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.json({ mensaje: 'API REST de Películas funcionando correctamente' });
});

// Poner a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});