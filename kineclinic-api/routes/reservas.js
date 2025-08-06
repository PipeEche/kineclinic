const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// 🟢 Crear nueva reserva
router.post('/', async (req, res) => {
  const { nombre, email, telefono, servicio, fecha, hora } = req.body;

  if (!nombre || !email || !telefono || !servicio || !fecha || !hora) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const yaExiste = await Reserva.findOne({ fecha, hora });

    if (yaExiste) {
      return res.status(409).json({ mensaje: 'Hora ya reservada en ese día' });
    }

    const nuevaReserva = new Reserva({ nombre, email, telefono, servicio, fecha, hora });
    await nuevaReserva.save();

    // 📄 Guardar en Excel por fecha
    try {
      const dirPath = path.join(__dirname, '../data');
      const fileName = `reservas-${fecha}.xlsx`;
      const filePath = path.join(dirPath, fileName);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const workbook = new ExcelJS.Workbook();

      if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
      }

      let sheet = workbook.getWorksheet('Reservas');
      if (!sheet) {
        sheet = workbook.addWorksheet('Reservas');
        sheet.addRow(['Nombre', 'Email', 'Teléfono', 'Servicio', 'Fecha', 'Hora']);
      }

      sheet.addRow([nombre, email, telefono, servicio, fecha, hora]);
      await workbook.xlsx.writeFile(filePath);

      console.log(`✅ Reserva guardada en Excel: ${fileName} → ${nombre} - ${fecha} ${hora}`);
    } catch (excelError) {
      console.error('⚠️ Error al guardar en Excel:', excelError.message);
    }

    res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
  } catch (error) {
    console.error('Error al guardar la reserva:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor al crear reserva' });
  }
});

// 🔍 Obtener reservas (todas o filtradas por fecha/servicio)
router.get('/', async (req, res) => {
  const { fecha, servicio } = req.query;
  const filtro = {};

  if (fecha) filtro.fecha = fecha;
  if (servicio) filtro.servicio = servicio;

  try {
    const reservas = await Reserva.find(filtro).sort({ createdAt: -1 });
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor al obtener reservas' });
  }
});

// ❌ Eliminar reserva por ID
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Reserva.findByIdAndDelete(req.params.id);
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.status(200).json({ mensaje: 'Reserva eliminada con éxito' });
  } catch (err) {
    console.error('Error al eliminar reserva:', err.message);
    res.status(500).json({ mensaje: 'Error del servidor al eliminar reserva' });
  }
});

// 🕒 Obtener horas disponibles por fecha
router.get('/horas-disponibles', async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ mensaje: 'La fecha es obligatoria' });

  const dia = new Date(fecha + 'T00:00:00').getDay();
  const horasSemana = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
  const horasSabado = ['09:00','10:00','11:00','12:00','13:00'];

  if (dia === 0) return res.status(200).json([]); // domingo

  const todasLasHoras = dia === 6 ? horasSabado : horasSemana;

  try {
    const reservas = await Reserva.find({ fecha });
    const horasOcupadas = reservas.map(r => r.hora);
    const horasDisponibles = todasLasHoras.filter(h => !horasOcupadas.includes(h));
    res.status(200).json(horasDisponibles);
  } catch (err) {
    console.error('Error al obtener horas disponibles:', err.message);
    res.status(500).json({ mensaje: 'Error del servidor al consultar horas disponibles' });
  }
});

module.exports = router;
