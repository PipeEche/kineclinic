// src/components/Contacto.jsx
import '../styles/contacto.scss';

function Contacto() {
  return (
    <section className="contacto" id="contacto">
      <div className="contacto__container">
        <h2>Contáctanos</h2>

        <div className="contacto__grid">
          <div className="contacto__card">
            <i className="fas fa-map-marker-alt contacto__icon"></i>
            <h3>Ubicación</h3>
            <p>Av. Inventada 1234</p>
            <p>Oficina 506, San Fernando, Chile</p>
          </div>

          <div className="contacto__card">
            <i className="fas fa-phone-alt contacto__icon"></i>
            <h3>Teléfono</h3>
            <p>+56 9 1234 5678</p>
            <p>contacto@kineclinic.cl</p>
          </div>

          <div className="contacto__card">
            <i className="fas fa-clock contacto__icon"></i>
            <h3>Horarios</h3>
            <p>Lunes a Viernes: 8:00 - 20:00</p>
            <p>Sábados: 9:00 - 14:00</p>
          </div>
        </div>

        <form className="contacto__form" onSubmit={(e) => {
          e.preventDefault();
          alert('Gracias por tu mensaje. Nos contactaremos pronto.');
        }}>
          <div className="contacto__row">
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo electrónico" required />
          </div>
          <textarea rows="4" placeholder="Mensaje" required></textarea>
          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
}

export default Contacto;
