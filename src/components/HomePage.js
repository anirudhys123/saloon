import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import regis from "../Assets/regis.png";
import tg from "../Assets/tg.jpeg";
import ac from "../Assets/ac.jpeg";
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (salonType, salonName) => {
    navigate('/services', { state: { salonType, salonName } });
  };

  return (
    <>
      <Header />
      <h1 style={{ marginTop: '100px' }}>Popular Salons</h1>
      <div className="home-page-container">
        <div className="card-container">
          <div className="card" onClick={() => handleCardClick('men', 'Regis Salon')}>
            <img src={regis} alt="Regis Salon" className="card-img-top" style={{ height: '300px' }} />
            <div className="card-body">
              <h2 className="card-title">(Only For Men)</h2>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card" onClick={() => handleCardClick('women', 'Tony & Guy')}>
            <img src={tg} alt="Tony & Guy" className="card-img-top" style={{ height: '300px' }} />
            <div className="card-body">
              <h2 className="card-title">(Only For Women)</h2>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card" onClick={() => handleCardClick('both', 'American Crew')}>
            <img src={ac} alt="American Crew" className="card-img-top" style={{ height: '300px' }} />
            <div className="card-body">
              <h2 className="card-title">(For Both Men & Women)</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
