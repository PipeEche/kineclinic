import { useEffect, useState } from 'react';
import '../styles/scrolltop.scss';

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mostrarBoton = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', mostrarBoton);
    return () => window.removeEventListener('scroll', mostrarBoton);
  }, []);

  const subirAlInicio = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button className="scrolltop" onClick={subirAlInicio}>
        ↑
      </button>
    )
  );
}

export default ScrollTopButton;
