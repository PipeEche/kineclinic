import '../styles/servicios.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBone, faRunning, faBaby, faLungs, faWheelchair, faWater} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBone, faRunning, faBaby, faLungs, faWheelchair, faWater);


function Servicios() {
  const servicios = [
    {
      icon: faBone,
      titulo: 'Rehabilitación Ortopédica',
      descripcion: 'Tratamiento de lesiones musculoesqueléticas y postoperatorios.'
    },
    {
      icon: faRunning,
      titulo: 'Kinesiología Deportiva',
      descripcion: 'Prevención y tratamiento de lesiones deportivas.'
    },
    {
      icon: faBaby,
      titulo: 'Kinesiología Infantil',
      descripcion: 'Atención especializada en problemas motores en niños.'
    },
    {
      icon: faLungs,
      titulo: 'Rehabilitación Respiratoria',
      descripcion: 'Tratamiento para mejorar la función pulmonar.'
    },
    {
      icon: faWheelchair,
      titulo: 'Neurología Adulto',
      descripcion: 'Rehabilitación para pacientes con secuelas neurológicas.'
    },
    {
      icon: faWater,
      titulo: 'Hidroterapia',
      descripcion: 'Terapia acuática para rehabilitación y relajación.'
    }
  ];

  return (
    <section className="servicios" id="servicios">
      <div className="servicios__container">
        <h2 className="servicios__titulo">Nuestros Servicios</h2>
        <p className="servicios__descripcion">
          Ofrecemos tratamientos especializados para recuperar tu movilidad y aliviar el dolor.
        </p>
        <div className="servicios__grid">
          {servicios.map((serv, index) => (
            <div key={index} className="servicios__card">
              <FontAwesomeIcon icon={serv.icon} className="servicios__icon" />
              <h3>{serv.titulo}</h3>
              <p>{serv.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
