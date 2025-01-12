import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FooterTeacher.css';
import BeaconsIcon from "../../assets/imgbeacon.png";
import RotasIcon from "../../assets/imgrotas.png";
import NotificacoesIcon from "../../assets/imgalert.png";
import TurmasIcon from "../../assets/imgturmas.png";
import GpsIcon from "../../assets/imgrotas.png";

const FooterStudent = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer__item">
        <img src={BeaconsIcon} alt="Beacons" className="footer__icon" />
        <span>Beacons</span>
      </div>
      <div className="footer__item">
        <img src={TurmasIcon} alt="Turmas" className="footer__icon" onClick={() => navigate('/teacher/dashboard')} />
        <span className="footer__item--active">Turmas</span>
      </div>
      <div className="footer__item">
        <img src={GpsIcon} alt="GPS" className="footer__icon" onClick={() => navigate('/teacher/location')} />
        <span>Mapa</span>
      </div>
    </footer>
  );
};

export default FooterStudent;
