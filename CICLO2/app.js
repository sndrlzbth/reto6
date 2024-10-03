const express = require('express');
const bodyParser = require('body-parser');
const dbconnect = require('./config');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
const PORT = 3001;

// Conectar a la base de datos
dbconnect();

// Middleware
app.use(bodyParser.json());
app.use('/api/restaurants', restaurantRoutes);

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de restaurantes. Usa /api/restaurants para acceder a las rutas.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
