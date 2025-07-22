import '../styles/footer.scss';
import logo from '/assets/kine.png';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    const enlaces = document.querySelectorAll('[data-target="#profesionales"]');
    const handleClick = (e) => {
      e.preventDefault();
      const section = document.querySelector('#profesionales');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    enlaces.forEach((enlace) => {
      enlace.addEventListener('click', handleClick);
    });

    // Cleanup para evitar duplicados
    return () => {
      enlaces.forEach((enlace) => {
        enlace.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="footer">
      <div className="footer__container">
  
        <div className="footer__column">
          <img className="footer__logo" src={logo} alt="Logo Kinésis" />
          <p>Especialistas en rehabilitación física y tratamiento de lesiones. Tu bienestar es nuestra prioridad.</p>
        </div>


        <div className="footer__column">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#profesionales">Profesionales</a></li>
            <li><a href="#reserva">Reserva</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Especialidades</h3>
          <ul>
            <li><a href="" data-target="#profesionales">Ortopedia</a></li>
            <li><a href="" data-target="#profesionales">Deportiva</a></li>
            <li><a href="" data-target="#profesionales">Infantil</a></li>
            <li><a href="" data-target="#profesionales">Neurológica</a></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Nosotros</h3>
          <div className="footer__social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 KineClinic. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default Footer;
