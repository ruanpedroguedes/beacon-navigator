import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FooterStudent.css';
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
        <img
          src={NotificacoesIcon}
          alt="Notificações"
          className="footer__icon" onClick={() => navigate('/student/informe')}
        />
        <span>Notificações</span>
      </div>
      <div className="footer__item">
        <img src={TurmasIcon} alt="Turmas" className="footer__icon" onClick={() => navigate('/student/dashboard')} />
        <span className="footer__item--active">Turmas</span>
      </div>
      <div className="footer__item">
        <img src={GpsIcon} alt="GPS" className="footer__icon" onClick={() => navigate('/student/location')} />
        <span>Mapa</span>
      </div>
    </footer>
  );
};

export default FooterStudent;
