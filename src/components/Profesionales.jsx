import '../styles/profesionales.scss';

const profesionales = [
  {
    nombre: 'Dr. Carlos Mendez',
    rol: 'Especialista en Ortopedia',
    descripcion: '15 años de experiencia en rehabilitación postoperatoria.',
    imagen: 'assets/carloss.png'
  },
  {
    nombre: 'Dra. Ana López',
    rol: 'Especialista en Deportiva',
    descripcion: 'Ex deportista con enfoque en alto rendimiento.',
    imagen: 'assets/anaa.png'
  },
  {
    nombre: 'Lic. Fernanda Ríos',
    rol: 'Especialista en Pediatría',
    descripcion: 'Amplia experiencia en desarrollo psicomotor infantil.',
    imagen: 'assets/anaa.png'
  },
  {
    nombre: 'Dr. Roberto Silva',
    rol: 'Especialista en Neurología',
    descripcion: 'Rehabilitación post-ACV y lesiones medulares.',
    imagen: 'assets/carloss.png'
  }
];

function Profesionales() {
  return (
    <section className="profesionales" id="profesionales">
      <div className="profesionales__container">
        <h2 className="profesionales__titulo">Nuestros Profesionales</h2>
        <p className="profesionales__descripcion">
          Equipo de kinesiólogos especializados en diferentes áreas.
        </p>
        <div className="profesionales__grid">
            {profesionales.map((pro, index) => (
              <div key={index} className="profesionales__card">
                <div className="profesionales__imagen">
                  <img
                    src={`${import.meta.env.BASE_URL}${pro.imagen}`}
                    alt={`Foto de ${pro.nombre}`}
                  />
                </div>
                <h3>{pro.nombre}</h3>
                <p className="profesionales__rol">{pro.rol}</p>
                <p>{pro.descripcion}</p>
              </div>
            ))}
          </div>

      </div>
    </section>
  );
}

export default Profesionales;
