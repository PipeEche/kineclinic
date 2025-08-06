import { useState } from 'react';
import axios from 'axios';
import '../styles/reserva.scss';

const API_URL = 'http://localhost:5000/api/reservas';

function Reserva() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    fecha: '',
    hora: '',
  });

  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarCambioFecha = async (e) => {
    const valor = e.target.value;
    if (!valor) return;

    const fecha = new Date(valor + 'T00:00:00');
    const dia = fecha.getDay();

    if (dia === 0) {
      alert('Lo sentimos, KineClinic no atiende los domingos. Por favor selecciona otro día.');
      setFormulario({ ...formulario, fecha: '' });
      setHorasDisponibles([]);
      return;
    }

    setFormulario({ ...formulario, fecha: valor });

    try {
      const res = await axios.get(`${API_URL}/horas-disponibles?fecha=${valor}`);
      if (res.data.length === 0) {
        alert('No hay horas disponibles para ese día.');
      }
      setHorasDisponibles(res.data);
    } catch (err) {
      alert('No se pudieron cargar las horas disponibles porque no está conectada la base de datos.');
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const { nombre, email, telefono, servicio, fecha, hora } = formulario;

    if (!nombre || !email || !telefono || !servicio || !fecha || !hora) {
      alert('Por favor completa todos los campos antes de enviar.');
      return;
    }

    try {
      const res = await axios.post(API_URL, formulario);
      alert('Reserva enviada con éxito. Nos contactaremos contigo para confirmar.');
      setFormulario({
        nombre: '',
        email: '',
        telefono: '',
        servicio: '',
        fecha: '',
        hora: '',
      });
      setHorasDisponibles([]);
    } catch (err) {
      if (err.response?.status === 409) {
        alert('La hora seleccionada ya está ocupada. Elige otra.');
      } else {
        alert('Hubo un problema al enviar la reserva. Inténtalo más tarde.');
      }
    }
  };

  return (
    <section className="reserva" id="reserva">
      <div className="reserva__container">
        <div className="reserva__info">
          <h2>Reserva tu hora</h2>
          <p>Complete el formulario para agendar tu evaluación kinesiológica.</p>
          <div className="reserva__datos">
            <p><strong>Horario:</strong> Lunes a Viernes 8:00 - 20:00 / Sábados 9:00 - 14:00</p>
            <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
            <p><strong>Dirección:</strong> Av. Providencia 1234, Oficina 506, Santiago</p>
          </div>
        </div>

        <form className="reserva__form" onSubmit={manejarEnvio}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formulario.email}
            onChange={manejarCambio}
            required
          />

          <div className="reserva__campo-telefono">
            <label htmlFor="telefono"></label>
            <div className="reserva__telefono-input">
              <span className="reserva__codigo">+56</span>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                pattern="[0-9]{9}"
                maxLength={9}
                placeholder="Ingrese su número de teléfono"
                value={formulario.telefono}
                onChange={manejarCambio}
                required
              />
            </div>
          </div>

          <select
            name="servicio"
            value={formulario.servicio}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="ortopedia">Rehabilitación Ortopédica</option>
            <option value="deportiva">Kinesiología Deportiva</option>
            <option value="pediatria">Kinesiología Infantil</option>
            <option value="respiratoria">Rehabilitación Respiratoria</option>
            <option value="neurologia">Neurología Adulto</option>
            <option value="hidroterapia">Hidroterapia</option>
          </select>

          <input
            type="date"
            name="fecha"
            value={formulario.fecha}
            onChange={manejarCambioFecha}
            required
          />

          <select
            name="hora"
            value={formulario.hora}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione hora</option>
            {horasDisponibles.map((hora) => (
              <option key={hora} value={hora}>{hora}</option>
            ))}
          </select>

          <button type="submit">Confirmar Reserva</button>
        </form>
      </div>
    </section>
  );
}

export default Reserva;
