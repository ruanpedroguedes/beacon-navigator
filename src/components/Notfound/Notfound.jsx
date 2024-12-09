import React from "react";
import './Notfound.css';
import exclamationMark from '/src/assets/exclamation-mark.png';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Página não encontrada</p>
            <p>Desculpe, mas a página que você está procurando não existe.</p>
            <img src={exclamationMark} alt="" />
        </div>
    );
};

export default NotFound;