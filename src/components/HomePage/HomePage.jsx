import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Para estilização

const StartPageComponent = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="start-page">
      <button onClick={handleButtonClick}>Vamos Começar</button>
    </div>
  );
};

export default StartPageComponent;