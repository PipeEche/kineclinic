const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const reservasRoutes = require('./routes/reservas');
const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado ✅'))
.catch((err) => console.error('Error al conectar MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use('/api/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API KineClinic funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
