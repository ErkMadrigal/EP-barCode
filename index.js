// index.js
const express = require('express');
const bodyParser = require('body-parser');
const datosRoutes = require('./routes/datos');
require('dotenv').config(); // Cargar variables de entorno
const cors = require('cors')


const app = express();
app.use(bodyParser.json());

app.use(cors());
// Usar las rutas de datos
app.use('/api/datos', datosRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
