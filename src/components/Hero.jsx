// src/components/Hero.jsx
import '../styles/hero.scss';

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__container">
        <div className="hero__text">
          <h1>Tu bienestar en las mejores manos</h1>
          <p>
            En KineClinic nos especializamos en rehabilitación física y tratamiento de lesiones
            con profesionales altamente capacitados.
          </p>
          <a href="#reserva" className="hero__cta">Reserva tu hora</a>
        </div>
        <div className="hero__image">
          <img src="/assets/heroclinic.png" alt="Imagen KineClinic" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
