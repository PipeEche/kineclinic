import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/panelreservas.scss';

function PanelReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/reservas')
      .then((res) => setReservas(res.data))
      .catch((err) => console.error('Error al obtener reservas:', err));
  }, []);

  const borrarReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservas/${id}`);
      setReservas((prevReservas) => prevReservas.filter((r) => r._id !== id));
    } catch (err) {
      alert('No se pudo eliminar la reserva');
    }
  };

  return (
    <section className="panelreservas">
      <h2>Reservas recibidas</h2>

      {reservas.length === 0 ? (
        <p>No hay reservas aún.</p>
      ) : (
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva._id}>
              <strong>{reserva.nombre}</strong> — {reserva.servicio} — {reserva.fecha} a las {reserva.hora}
              <button onClick={() => borrarReserva(reserva._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PanelReservas;
