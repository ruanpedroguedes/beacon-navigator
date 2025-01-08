import React from 'react';
import './Footer.css';
import BeaconsIcon from "../../assets/imgbeacon.png";
import RotasIcon from "../../assets/imgrotas.png";
import NotificacoesIcon from "../../assets/imgalert.png";
import TurmasIcon from "../../assets/imgturmas.png";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__item">
        <img src={BeaconsIcon} alt="Beacons" className="footer__icon" />
        <span>Beacons</span>
      </div>
      <div className="footer__item">
        <img src={RotasIcon} alt="Rotas" className="footer__icon" />
        <span>Rotas</span>
      </div>
      <div className="footer__item">
        <img src={TurmasIcon} alt="Turmas" className="footer__icon" />
        <span className="footer__item--active">Turmas</span>
      </div>
    </footer>
  );
};

export default Footer;
