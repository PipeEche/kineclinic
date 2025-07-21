const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  servicio: String,
  fecha: String,
  hora: String,
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
