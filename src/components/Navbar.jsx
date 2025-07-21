import { useEffect } from 'react';
import '../styles/navbar.scss';
import logo from '/assets/kine.png';

function Navbar() {
  useEffect(() => {
    const handleClickFuera = (e) => {
      const menu = document.querySelector('.navbar__links');
      const toggle = document.querySelector('.navbar__toggle');

      if (
        menu &&
        toggle &&
        menu.classList.contains('navbar__links--active') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        menu.classList.remove('navbar__links--active');
      }
    };

    document.addEventListener('click', handleClickFuera);
    return () => {
      document.removeEventListener('click', handleClickFuera);
    };
  }, []);

  const toggleMenu = () => {
    const menu = document.querySelector('.navbar__links');
    if (menu) {
      menu.classList.toggle('navbar__links--active');
    }
  };

  return (
    <header className="navbar">
      <nav className="navbar__container">
        {/* Logo que redirige al inicio */}
        <a href="#" className="navbar__brand">
          <img src={logo} alt="Logo Kinésis" />
        </a>

        {/* Enlaces del menú */}
        <div className="navbar__links">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#profesionales">Profesionales</a>
          <a href="#reserva">Reserva</a>
          <a href="#contacto">Contacto</a>
        </div>

        {/* Botón hamburguesa */}
        <button className="navbar__toggle" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
