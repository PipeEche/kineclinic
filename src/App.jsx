// src/App.jsx
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Profesionales from './components/Profesionales';
import Reserva from './components/Reserva';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';

function App() {
  return (
    <div className="kineclinic-app">
      <Navbar />
      <Hero />
      <Servicios />
      <Profesionales />
      <Reserva />
      <Contacto />
      <Footer />
      <ScrollTopButton />
    </div>
  );
}

export default App;
